import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { formatAgenda } from "../utils/dates";
import { BADGE_EVENT_TYPE, BADGE_TARIF } from "../constants";
import {
  sectionLabel,
  sectionValue,
  sectionText,
  backButton,
} from "../components/ui/typography";
import { bg, text, card } from "../components/ui/designTokens";
import PageHeader from "../components/ui/PageHeader";
import { ShareButton } from "../components/ui/ActionButtons";
import Lightbox from "../components/ui/Lightbox";
import Divider from "../components/ui/Divider";
import LoadingState from "../components/ui/LoadingState";
import OrgCard from "../components/cards/OrgCard";
import {
  BarIcon,
  RestaurationIcon,
  ParkingIcon,
  SanitaireIcon,
  SignalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../components/ui/icons";

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

  if (loading) return <LoadingState fullPage />;
  if (!event) return <LoadingState fullPage text="Événement introuvable" />;

  const org = event.organisateurs;

  const infosPratiques = [
    { key: "infos_bar", label: "Bar", icon: <BarIcon /> },
    {
      key: "infos_restauration",
      label: "Restauration",
      icon: <RestaurationIcon />,
    },
    { key: "infos_parking", label: "Parking", icon: <ParkingIcon /> },
    { key: "infos_sanitaire", label: "Sanitaires", icon: <SanitaireIcon /> },
  ].filter(({ key }) => !!event[key]);

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
              <ChevronLeftIcon size={18} />
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
          <h1 className="text-4xl font-bold tracking-tight text-balance text-gray-950 dark:text-slate-100 leading-tight">
            {event.title}
          </h1>
        </div>

        {/* Bloc infos */}
        <div className={card + " overflow-hidden"}>
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
                      className={
                        "inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium " +
                        bg.subtle +
                        " " +
                        text.body
                      }
                    >
                      <span className="text-teal-600 dark:text-teal-400">
                        {icon}
                      </span>
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
            <OrgCard
              org={org}
              onClick={() => navigate("/organisateurs/" + org.org_id)}
            />
          </div>
        )}

        {/* Signalement */}
        <div className="mt-6 pb-4 flex flex-col items-center gap-2">
          <button
            onClick={() => navigate("/contact")}
            className={
              "flex items-center gap-2 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer " +
              text.muted
            }
          >
            <SignalIcon size={16} />
            <span className="text-xs">Signaler cet événement</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
