import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { formatAgenda } from "../utils/dates";
import { BADGE_EVENT_TYPE, BADGE_STATUT, BADGE_TARIF } from "../constants";
import {
  sectionLabel,
  sectionValue,
  sectionText,
  backButton,
} from "../components/ui/typography";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  async function fetchEvent() {
    const { data, error } = await supabase
      .from("events")
      .select("*, organisateurs(*)")
      .eq("id", id)
      .single();
    if (error) console.error(error);
    else setEvent(data);
    setLoading(false);
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-sm text-slate-400">Chargement...</p>
      </div>
    );

  if (!event)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-sm text-slate-400">Événement introuvable</p>
      </div>
    );

  const org = event.organisateurs;

  const infosPratiques = [
    { key: "infos_bar", label: "Bar", icon: "🍺" },
    { key: "infos_restauration", label: "Restauration", icon: "🍔" },
    { key: "infos_parking", label: "Parking", icon: "🅿️" },
    { key: "infos_sanitaire", label: "Sanitaires", icon: "🚻" },
  ].filter(({ key }) => !!event[key]);

  const Divider = () => (
    <div className="border-t border-gray-100 dark:border-slate-700" />
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header retour */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/organisateurs/" + org.id)}>
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

      <div className="px-3 pt-3 pb-28 flex flex-col gap-3 min-h-screen">
        {/* Image 4:5 */}
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full rounded-xl object-cover border border-gray-200 dark:border-slate-700"
            style={{ aspectRatio: "4/5" }}
          />
        ) : (
          <div
            className="w-full rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center"
            style={{ aspectRatio: "4/5" }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-slate-700"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Badges + Titre */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={
                "inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full " +
                (BADGE_EVENT_TYPE[event.type] || "bg-gray-100 text-gray-700")
              }
            >
              {event.type}
            </span>
            {event.event_tarif && (
              <span
                className={
                  "inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full " +
                  (BADGE_TARIF[event.event_tarif] ||
                    "bg-gray-100 text-gray-700")
                }
              >
                {event.event_tarif}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-balance text-gray-950 dark:text-slate-100 leading-tight">
            {event.title}
          </h1>
        </div>

        {/* Bloc infos */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-3">
            <p className={sectionLabel}>Date</p>
            <p
              className={
                sectionValue + " leading-relaxed whitespace-pre-line capitalize"
              }
            >
              {formatAgenda(event.date, event.date_fin)}
            </p>
          </div>

          <Divider />

          <div className="px-4 py-3">
            <p className={sectionLabel}>Lieu</p>
            <p className={sectionValue}>
              {event.location}
              {event.ville ? ", " + event.ville : ""}
            </p>
          </div>

          <Divider />

          <div className="px-4 py-3">
            <p className={sectionLabel}>Région</p>
            <p className={sectionValue}>{event.region}</p>
          </div>

          {event.description && (
            <>
              <Divider />
              <div className="px-4 py-3">
                <p className={sectionLabel}>Description</p>
                <p className={sectionText}>{event.description}</p>
              </div>
            </>
          )}

          {infosPratiques.length > 0 && (
            <>
              <Divider />
              <div className="px-4 py-3">
                <p className={sectionLabel}>Infos pratiques</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {infosPratiques.map(({ key, label, icon }) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 text-sm bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 px-3 py-1.5 rounded-full font-medium"
                    >
                      <span>{icon}</span>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {event.infos_complementaires && (
            <>
              <Divider />
              <div className="px-4 py-3">
                <p className={sectionLabel}>Informations complémentaires</p>
                <p className={sectionText}>{event.infos_complementaires}</p>
              </div>
            </>
          )}
        </div>

        {/* Organisateur */}
        {org && (
          <div>
            <p className={sectionLabel + " px-1 mb-2"}>Organisé par</p>
            <div
              onClick={() =>
                navigate("/organisateurs", { state: { selectedOrgId: org.id } })
              }
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:shadow-md dark:hover:shadow-slate-900/50 transition-shadow"
            >
              <div className="px-4 py-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm truncate">
                      {org.nom}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {org.type_org}
                      {org.ville ? " · " + org.ville : ""}
                      {org.region ? " · " + org.region : ""}
                    </p>
                    {org.description && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-2 line-clamp-2">
                        {org.description}
                      </p>
                    )}
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-300 dark:text-slate-600 shrink-0 mt-0.5"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetail;
