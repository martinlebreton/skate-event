import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error("Erreur :", error);
    else setEvent(data);
    setLoading(false);
  }

  const typeColors = {
    Street: "bg-blue-100 text-blue-700",
    Bowl: "bg-orange-100 text-orange-700",
    Ramp: "bg-green-100 text-green-700",
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );

  if (!event)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Événement introuvable</p>
      </div>
    );

  const formattedDate = new Date(event.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 pt-6 pb-24">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-6"
        >
          ← Retour
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Badge type */}
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[event.type] || "bg-gray-100 text-gray-700"}`}
          >
            {event.type}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 mt-3">
            {event.title}
          </h1>

          <div className="mt-4 space-y-2">
            <p className="text-gray-600">📅 {formattedDate}</p>
            <p className="text-gray-600">📍 {event.location}</p>
            <p className="text-gray-600">🗺️ {event.region}</p>
          </div>

          {event.description && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
