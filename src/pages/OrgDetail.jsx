import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEventsByOrganisateur } from "../hooks/useEventsByOrganisateur";
import EventCard from "../components/cards/EventCard";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { backButton } from "../components/ui/typography";

function OrgDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    upcoming,
    archives,
    loading: loadingEvents,
    error,
  } = useEventsByOrganisateur(id);

  useEffect(() => {
    fetchOrg();
  }, [id]);

  async function fetchOrg() {
    const { data, error } = await supabase
      .from("organisateurs")
      .select("*")
      .eq("id", id)
      .single();
    if (error) console.error(error);
    else setOrg(data);
    setLoading(false);
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-sm text-slate-400">Chargement...</p>
      </div>
    );

  if (!org)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-sm text-slate-400">Organisateur introuvable</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40">
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className={backButton}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </header>
      </div>

      <div className="px-3 pt-3 pb-28 flex flex-col gap-4 min-h-screen">
        {/* Card organisateur */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge type="typeOrg" value={org.type_org} size="sm" />
              <Badge type="statut" value={org.statut} size="sm" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-gray-950 dark:text-slate-100 mb-1">
              {org.nom}
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {org.ville ? org.ville : ""}
              {org.region ? (org.ville ? " · " : "") + org.region : ""}
            </p>
            {org.description && (
              <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mt-3">
                {org.description}
              </p>
            )}
          </div>

          {/* Contacts */}
          <div className="px-4 py-3 flex flex-col gap-2.5">
            {org.mail && (
              <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
                <span>✉️</span>
                <span className="truncate">{org.mail}</span>
              </div>
            )}
            {org.tel && (
              <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
                <span>📞</span>
                <span>{org.tel}</span>
              </div>
            )}
            {org.lien && (
              <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
                <span>🔗</span>
                <span className="truncate">{org.lien}</span>
              </div>
            )}
            {org.instagram && (
              <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </span>
                <span>{org.instagram}</span>
              </div>
            )}
          </div>
        </div>

        {/* Chargement events */}
        {loadingEvents && (
          <p className="text-center text-sm text-slate-400 dark:text-slate-600 mt-4">
            Chargement des événements...
          </p>
        )}

        {!loadingEvents && error && <EmptyState error={error} />}

        {/* Prochains événements */}
        {!loadingEvents && !error && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">
              Prochains événements
              {upcoming.length > 0 && (
                <span className="ml-2 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-full text-[10px]">
                  {upcoming.length}
                </span>
              )}
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-600 text-center py-4">
                Aucun événement à venir
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {upcoming.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onClick={(id) => navigate("/events/" + id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Archives */}
        {!loadingEvents && !error && archives.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">
              Archives
              <span className="ml-2 bg-gray-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full text-[10px]">
                {archives.length}
              </span>
            </h2>
            <div className="flex flex-col gap-2.5 opacity-60">
              {archives.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  onClick={(id) => navigate("/events/" + id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrgDetail;
