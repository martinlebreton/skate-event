function EventCard({ event, onClick }) {
  const formattedDate = new Date(event.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const typeColors = {
    street: "bg-blue-100 text-blue-700",
    bowl: "bg-orange-100 text-orange-700",
    ramp: "bg-green-100 text-green-700",
  };
  const typeStyle = typeColors[event.type] || "bg-gray-100 text-gray-700";

  return (
    <div
      onClick={() => onClick(event.id)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
    >
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-40 object-cover rounded-xl mb-3"
        />
      )}
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-full ${typeStyle}`}
      >
        {event.type}
      </span>
      <h2 className="text-lg font-bold text-gray-900 mt-2">{event.title}</h2>
      <p className="text-sm text-gray-500 mt-1">📅 {formattedDate}</p>
      <p className="text-sm text-gray-500">
        📍 {event.location} — {event.region}
      </p>
      {event.description && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {event.description}
        </p>
      )}
    </div>
  );
}

export default EventCard;
