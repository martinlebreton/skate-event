import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { BADGE_EVENT_TYPE, BADGE_STATUT } from "../constants";

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
        <p className="text-sm text-gray-400 dark:text-slate-600">
          Chargement...
        </p>
      </div>
    );

  if (!event)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-sm text-gray-400 dark:text-slate-600">
          Événement introuvable
        </p>
      </div>
    );

  // ── Formatage des dates ──────────────────────────────────
  const debut = new Date(event.date);
  const fin = event.date_fin ? new Date(event.date_fin) : null;
  const memeJour = fin && debut.toDateString() === fin.toDateString();

  function formatJour(date) {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatHeure(date) {
    return date
      .toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(":", "h");
  }

  function formatAgenda() {
    if (!fin) {
      return "Le " + formatJour(debut) + " à " + formatHeure(debut);
    }
    if (memeJour) {
      return (
        "Le " +
        formatJour(debut) +
        "\nde " +
        formatHeure(debut) +
        " à " +
        formatHeure(fin)
      );
    }
    return (
      "Du " +
      formatJour(debut) +
      " à " +
      formatHeure(debut) +
      "\nau " +
      formatJour(fin) +
      " à " +
      formatHeure(fin)
    );
  }

  // ── Infos pratiques ──────────────────────────────────────
  const infosPratiques = [
    { key: "infos_bar", label: "Bar", icon: "🍺" },
    { key: "infos_restauration", label: "Restauration", icon: "🍔" },
    { key: "infos_parking", label: "Parking", icon: "🅿️" },
    { key: "infos_sanitaire", label: "Sanitaires", icon: "🚻" },
  ].filter(({ key }) => !!event[key]);

  const org = event.organisateurs;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header retour */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-3.5 flex items-center gap-3 bg-hatch">
        <button
          onClick={() => navigate(-1)}
          className="text-[13px] font-medium text-teal-600 dark:text-teal-400 bg-transparent border-none cursor-pointer p-0"
        >
          ← Retour
        </button>
        <span className="text-[13px] text-gray-400 dark:text-slate-600 truncate">
          {event.title}
        </span>
      </header>

      <div className="px-3 pt-3 pb-28 flex flex-col gap-3 bg-hatch min-h-screen">
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

        {/* Badge + Titre */}
        <div>
          <span
            className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-2 ${BADGE_EVENT_TYPE[event.type] || "bg-gray-100 text-gray-700"}`}
          >
            {event.type}
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-balance text-gray-950 dark:text-slate-100 leading-tight">
            {event.title}
          </h1>
        </div>

        {/* Bloc date agenda */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-2">
            📅 Date
          </dt>
          <dd className="text-[14px] font-medium text-gray-900 dark:text-slate-100 leading-relaxed whitespace-pre-line capitalize">
            {formatAgenda()}
          </dd>
        </div>

        {/* Bloc lieu */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-0.5">
                📍 Lieu
              </dt>
              <dd className="text-[14px] font-medium text-gray-900 dark:text-slate-100">
                {event.location}
                {event.ville ? ", " + event.ville : ""}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-0.5">
                🗺️ Région
              </dt>
              <dd className="text-[14px] font-medium text-gray-900 dark:text-slate-100">
                {event.region}
              </dd>
            </div>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-2">
              Description
            </dt>
            <p className="text-[14px] text-gray-600 dark:text-slate-400 leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* Infos pratiques */}
        {infosPratiques.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-3">
              Infos pratiques
            </dt>
            <div className="flex flex-wrap gap-2">
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
        )}

        {/* Infos complémentaires */}
        {event.infos_complementaires && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-2">
              Informations complémentaires
            </dt>
            <p className="text-[14px] text-gray-600 dark:text-slate-400 leading-relaxed">
              {event.infos_complementaires}
            </p>
          </div>
        )}

        {/* Organisateur */}
        {org && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            {/* En-tête */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm truncate">
                    {org.nom}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                    {org.type_org}
                    {org.ville ? " · " + org.ville : ""}
                    {org.region ? " · " + org.region : ""}
                  </p>
                </div>
                <span
                  className={
                    "text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 " +
                    (BADGE_STATUT[org.statut] || "")
                  }
                >
                  {org.statut}
                </span>
              </div>

              {org.description && (
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mt-2">
                  {org.description}
                </p>
              )}
            </div>

            {/* Contacts */}
            <div className="px-4 py-3 flex flex-col gap-2">
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
              {(org.adresse || org.code_postal || org.ville) && (
                <div className="flex items-start gap-2.5 text-xs text-gray-400 dark:text-slate-500">
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
        )}
      </div>
    </div>
  );
}

export default EventDetail;
