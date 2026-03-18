import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrganisateurs } from "../hooks/useOrganisateurs";
import { useEventsByOrganisateur } from "../hooks/useEventsByOrganisateur";
import OrgCard from "../components/cards/OrgCard";
import EventCard from "../components/cards/EventCard";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { useEnums } from "../hooks/useEnums";
import {
  sectionLabel,
  sectionValue,
  sectionText,
  backButton,
} from "../components/ui/typography";

// ── Vue détail organisateur ───────────────────────────────
function OrgDetail({ org, onBack }) {
  const { upcoming, archives, loading, error } = useEventsByOrganisateur(
    org.id,
  );
  const navigate = useNavigate();
  const location = useLocation();

  function handleBack() {
    if (location.state?.selectedOrgId) {
      navigate(-1);
    } else {
      onBack();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex items-center gap-3">
        <button onClick={handleBack} className={backButton}>
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

      <div className="px-3 pt-3 pb-28 flex flex-col gap-4 bg-hatch min-h-screen">
        {/* Card organisateur */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-slate-700">
            {/* Type org au dessus du nom */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge type="typeOrg" value={org.type_org} size="sm" />
              <Badge type="statut" value={org.statut} size="sm" />
            </div>

            {/* Nom */}
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
            {(org.adresse || org.code_postal || org.ville) && (
              <div className="flex items-start gap-2.5 text-xs text-slate-400 dark:text-slate-500">
                <span>📍</span>
                <span>
                  {[org.adresse, org.code_postal, org.ville]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Chargement events */}
        {loading && (
          <p className="text-center text-sm text-slate-400 dark:text-slate-600 mt-4">
            Chargement des événements...
          </p>
        )}

        {/* Erreur */}
        {!loading && error && <EmptyState error={error} />}

        {/* Prochains événements */}
        {!loading && !error && (
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
        {!loading && !error && archives.length > 0 && (
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

// ── Page liste organisateurs ──────────────────────────────
function Organisateurs() {
  const { organisateurs, loading, fetchError } = useOrganisateurs();
  const { regions } = useEnums();
  const [selected, setSelected] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedOrgId && organisateurs.length > 0) {
      const org = organisateurs.find(
        (o) => o.id === location.state.selectedOrgId,
      );
      if (org) {
        setSelected(org);
        window.history.replaceState({}, "");
      }
    }
  }, [location.state, organisateurs]);

  // Filtre les organisateurs par région
  const filtered = selectedRegion
    ? organisateurs.filter((o) => o.region === selectedRegion)
    : organisateurs;

  if (selected)
    return <OrgDetail org={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 pt-5 pb-4 ">
        <h1 className="text-xl font-bold tracking-tight uppercase text-gray-950 dark:text-slate-100">
          ORGA
          <span className="text-teal-600 dark:text-teal-400">NISATEURS</span>
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Les organisateurs font vivre la scène skate
        </p>
      </header>

      {/* Filtre région */}
      <div className="flex gap-2 px-3 py-2.5 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 overflow-x-auto bg-hatch">
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className={
            "font-sans text-[13px] font-medium px-3 py-1.5 rounded-lg border appearance-none cursor-pointer shrink-0 transition-colors duration-150 " +
            (selectedRegion
              ? "border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400"
              : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-400")
          }
        >
          <option value="">Toutes les régions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <main className="px-3 pt-3 pb-28 bg-hatch min-h-screen">
        {loading && (
          <p className="text-center text-sm text-slate-400 dark:text-slate-600 mt-16">
            Chargement...
          </p>
        )}

        {!loading && fetchError && <EmptyState error={fetchError} />}

        {!loading && !fetchError && filtered.length === 0 && (
          <EmptyState
            icon="🏢"
            title="Aucun organisateur"
            subtitle={selectedRegion ? "Essaie une autre région" : ""}
          />
        )}

        {!loading && !fetchError && (
          <div className="flex flex-col gap-2.5">
            {filtered.map((org) => (
              <OrgCard
                key={org.id}
                org={org}
                onClick={(org) => setSelected(org)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Organisateurs;
