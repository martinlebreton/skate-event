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
import { bg, text } from "../components/ui/designTokens";
import PageHeader from "../components/ui/PageHeader";
import { ShareButton } from "../components/ui/ActionButtons";
import Lightbox from "../components/ui/Lightbox";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
      <div
        className={"flex items-center justify-center min-h-screen " + bg.page}
      >
        <p className={"text-sm " + text.muted}>Chargement...</p>
      </div>
    );

  if (!event)
    return (
      <div
        className={"flex items-center justify-center min-h-screen " + bg.page}
      >
        <p className={"text-sm " + text.muted}>Événement introuvable</p>
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
    <div className={"min-h-screen " + bg.page}>
      {/* Lightbox */}
      {lightboxOpen && event.image_url && (
        <Lightbox
          src={event.image_url}
          alt={event.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Header sticky */}
      <div className="sticky top-0 z-40">
        <PageHeader
          back={
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
          }
          actions={
            <ShareButton
              title={event.title}
              text={
                event.title +
                " — " +
                event.location +
                (event.ville ? ", " + event.ville : "")
              }
              url={window.location.origin + "/events/" + event.id}
            />
          }
        />
      </div>

      <div className="px-3 pt-3 pb-28 flex flex-col gap-3 min-h-screen">
        {/* Image 16:9 cliquable */}
        {event.image_url ? (
          <div
            onClick={() => setLightboxOpen(true)}
            className="relative cursor-zoom-in overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={event.image_url}
              alt={event.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Indicateur zoom */}
            <div className="absolute bottom-2 right-2 bg-black/40 rounded-lg px-2 py-1 flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
              <span className="text-white text-[10px] font-medium">
                Agrandir
              </span>
            </div>
          </div>
        ) : (
          <div
            className={
              "w-full rounded-xl flex items-center justify-center border border-gray-200 dark:border-slate-700 " +
              bg.subtle
            }
            style={{ aspectRatio: "16/9" }}
          >
            <svg
              width="32"
              height="32"
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
        <div
          className={
            "rounded-xl overflow-hidden " +
            bg.surface +
            " border border-gray-200 dark:border-slate-700"
          }
        >
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
                      className={
                        "inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium " +
                        bg.subtle +
                        " " +
                        text.body
                      }
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
          <div className="mt-4">
            <p className={sectionLabel + " px-1 mb-2"}>Organisé par</p>
            <div
              onClick={() => navigate("/organisateurs/" + org.id)}
              className={
                "rounded-xl overflow-hidden cursor-pointer hover:shadow-md dark:hover:shadow-slate-900/50 transition-shadow " +
                bg.surface +
                " border border-gray-200 dark:border-slate-700"
              }
            >
              <div className="px-4 py-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className={"font-semibold text-sm truncate " + text.title}
                    >
                      {org.nom}
                    </p>
                    <p className={"text-xs mt-0.5 " + text.muted}>
                      {org.type_org}
                      {org.ville ? " · " + org.ville : ""}
                      {org.region ? " · " + org.region : ""}
                    </p>
                    {org.description && (
                      <p
                        className={
                          "text-xs leading-relaxed mt-2 line-clamp-2 " +
                          text.muted
                        }
                      >
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
                    className={"shrink-0 mt-0.5 " + text.hint}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Signalement */}
        <div className="mt-6 pb-4 flex flex-col items-center gap-2">
          <button
            onClick={() => navigate("/contact")}
            className={
              "flex items-center gap-2 hover:text-red-400 dark:hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer " +
              text.muted
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <span className="text-xs">Signaler cet événement</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
