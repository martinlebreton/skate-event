import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import EventCard from "../components/EventCard";
import Filters from "../components/Filters";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [selectedRegion, selectedType]);

  async function fetchEvents() {
    setLoading(true);

    let query = supabase
      .from("events")
      .select("*")
      .gte("date", new Date().toISOString())
      .order("date", { ascending: true })
      .limit(10);

    if (selectedRegion) query = query.eq("region", selectedRegion);
    if (selectedType) query = query.eq("type", selectedType);

    const { data, error } = await query;

    if (error) console.error("Erreur :", error);
    else setEvents(data);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">🛹 Skate Events</h1>
          <p className="text-gray-500 text-sm mt-1">
            Les prochains événements près de chez toi
          </p>
        </div>

        {/* Filtres */}
        <Filters
          selectedRegion={selectedRegion}
          selectedType={selectedType}
          onRegionChange={setSelectedRegion}
          onTypeChange={setSelectedType}
        />

        {/* Chargement */}
        {loading && (
          <p className="text-center text-gray-400 mt-10">Chargement...</p>
        )}

        {/* Aucun résultat */}
        {!loading && events.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-400">Aucun événement trouvé</p>
            <p className="text-sm text-gray-300 mt-1">
              Essaie d'autres filtres
            </p>
          </div>
        )}

        {/* Liste des events */}
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={(id) => navigate(`/events/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
