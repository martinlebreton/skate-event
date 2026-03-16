import Badge from "../ui/Badge";

function EventCard({ event, onClick, index = 0, actions }) {
  const formattedDate = new Date(event.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = new Date(event.date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={() => onClick?.(event.id)}
      className={
        "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden flex transition-shadow duration-150 mb-2" +
        (onClick
          ? "cursor-pointer hover:shadow-md dark:hover:shadow-slate-900/50"
          : "")
      }
      style={{ animationDelay: index * 0.08 + "s" }}
    >
      {/* Contenu gauche */}
      <div className="flex-1 min-w-0 p-4 flex flex-col justify-between gap-2">
        <div>
          <Badge type="eventType" value={event.type} size="md" />

          <h2 className="text-[15px] font-bold tracking-tight text-gray-950 dark:text-slate-100 leading-snug text-balance mt-2 mb-2">
            {event.title}
          </h2>

          <div className="text-[12px] text-gray-500 dark:text-slate-400 leading-relaxed">
            <span className="font-medium text-gray-700 dark:text-slate-300">
              {formattedDate}
            </span>
            {" · "}
            {formattedTime}
            <br />
            {event.location}
            {event.ville ? " · " + event.ville : ""}
          </div>
        </div>

        {/* Zone d'actions optionnelle — boutons Modifier/Supprimer en admin */}
        {actions && <div className="flex gap-2 mt-1">{actions}</div>}
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
