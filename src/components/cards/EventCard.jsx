import Badge from "../ui/Badge";
import { formatDateCourte, formatHeure } from "../../utils/dates";

function EventCard({ event, onClick, index = 0, actions }) {
  const formattedDate = formatDateCourte(event.date);
  const formattedTime = formatHeure(event.date);

  return (
    <div
      onClick={() => onClick?.(event.id)}
      className={
        "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden flex transition-shadow duration-150 " +
        (onClick
          ? "cursor-pointer hover:shadow-md dark:hover:shadow-slate-900/50"
          : "")
      }
      style={{ animationDelay: index * 0.08 + "s" }}
    >
      {/* Contenu gauche */}
      <div className="flex-1 min-w-0 p-4 flex flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          {/* Badge */}
          <div className="self-start">
            <Badge type="eventType" value={event.type} size="md" />
          </div>

          {/* Titre */}
          <h2 className="text-[16px] font-bold tracking-tight text-gray-950 dark:text-slate-100 leading-snug text-balance">
            {event.title}
          </h2>

          {/* Date + heure */}
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-gray-800 dark:text-slate-200">
              {formattedDate}
            </span>
            <span className="text-slate-300 dark:text-slate-600 text-[13px]">
              ·
            </span>
            <span className="text-[13px] text-slate-500 dark:text-slate-400">
              {formattedTime}
            </span>
          </div>

          {/* Lieu */}
          <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-snug">
            {event.location}
            {event.ville ? " · " + event.ville : ""}
          </p>

          {/* Organisé par */}
          {event.organisateurs?.nom && (
            <p className="text-[12px] text-slate-400 dark:text-slate-500">
              Organisé par{" "}
              <span className="font-medium text-teal-600 dark:text-teal-400">
                {event.organisateurs.nom}
              </span>
            </p>
          )}
        </div>

        {/* Zone d'actions optionnelle */}
        {actions && <div className="flex flex-col gap-2 mt-1">{actions}</div>}
      </div>

      {/* Image droite 4:5 */}
      {event.image_url ? (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-24 min-w-24 object-cover border-l border-gray-200 dark:border-slate-700"
          style={{ aspectRatio: "4/5" }}
        />
      ) : (
        <div
          className="w-24 min-w-24 border-l border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-900 flex items-center justify-center"
          style={{ aspectRatio: "4/5" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-300 dark:text-slate-700"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default EventCard;
