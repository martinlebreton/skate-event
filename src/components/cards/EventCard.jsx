import Badge from "../ui/Badge";
import { formatDateCourte, formatHeure } from "../../utils/dates";
import { text, bg, card } from "../ui/designTokens";
import { cardTitle } from "../ui/typography";

function EventCard({ event, onClick, index = 0, actions }) {
  const formattedDate = formatDateCourte(event.date);
  const formattedTime = formatHeure(event.date);

  function handleShare(e) {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text:
          event.title +
          " — " +
          formattedDate +
          " · " +
          (event.ville || event.location),
        url: window.location.origin + "/events/" + event.id,
      });
    } else {
      // Fallback — copie le lien dans le presse-papier
      navigator.clipboard.writeText(
        window.location.origin + "/events/" + event.id,
      );
    }
  }

  return (
    <div
      onClick={() => onClick?.(event.id)}
      className={
        card +
        " overflow-hidden flex flex-col transition-shadow duration-150 " +
        (onClick
          ? "cursor-pointer hover:shadow-md dark:hover:shadow-slate-900/50"
          : "")
      }
      style={{ animationDelay: index * 0.08 + "s" }}
    >
      {/* Image 16:9 */}
      {event.image_url ? (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full object-cover"
          style={{ aspectRatio: "16/9" }}
        />
      ) : (
        <div
          className={"w-full flex items-center justify-center " + bg.subtle}
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

      {/* Infos + Actions */}
      <div className="flex items-start gap-2 p-4">
        {/* Zone infos — gauche */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="self-start">
            <Badge type="eventType" value={event.type} size="md" />
          </div>

          <h2 className={cardTitle}>{event.title}</h2>

          <div className="flex items-center gap-1.5">
            <span className={"text-[13px] font-semibold " + text.title}>
              {formattedDate}
            </span>
            <span className={"text-[13px] " + text.hint}>·</span>
            <span className={"text-[13px] " + text.muted}>{formattedTime}</span>
          </div>

          <p className={"text-[13px] leading-snug " + text.muted}>
            {event.location}
            {event.ville ? " · " + event.ville : ""}
          </p>

          {event.organisateurs?.nom && (
            <p className={"text-[12px] " + text.muted}>
              Organisé par{" "}
              <span className={"font-medium " + text.primary}>
                {event.organisateurs.nom}
              </span>
            </p>
          )}

          {/* Zone actions admin */}
          {actions && <div className="flex flex-col gap-2 mt-1">{actions}</div>}
        </div>

        {/* Zone icônes — droite */}
        <div className="flex flex-col items-center gap-3 pt-0.5 shrink-0">
          {/* Partage */}
          <button
            onClick={handleShare}
            className={
              "flex items-center justify-center w-8 h-8 rounded-lg transition-colors " +
              bg.subtle +
              " hover:bg-gray-200 dark:hover:bg-slate-600"
            }
            title="Partager"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={"text-slate-400 dark:text-slate-500"}
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>

          {/* Favoris — désactivé */}
          <button
            onClick={(e) => e.stopPropagation()}
            className={
              "flex items-center justify-center w-8 h-8 rounded-lg cursor-not-allowed opacity-40 " +
              bg.subtle
            }
            title="Bientôt disponible"
            disabled
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-400 dark:text-slate-500"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
