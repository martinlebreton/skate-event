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
    if (error) console.error(error);
    else setEvents(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 pt-5 pb-4 bg-hatch">
        <h1 className="text-xl font-bold tracking-tight uppercase text-gray-950 dark:text-slate-100">
          SKATE<span className="text-teal-600 dark:text-teal-400">EVT</span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">
          Les prochains événements en France
        </p>
      </header>

      {/* Filtres */}
      <Filters
        selectedRegion={selectedRegion}
        selectedType={selectedType}
        onRegionChange={setSelectedRegion}
        onTypeChange={setSelectedType}
      />

      {/* Liste */}
      <main className="px-3 pt-3 pb-28 bg-hatch min-h-screen">
        {loading && (
          <p className="text-center text-sm text-gray-400 dark:text-slate-600 mt-16">
            Chargement...
          </p>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-lg font-bold tracking-tight text-gray-200 dark:text-slate-700">
              Aucun événement
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-600 mt-1">
              Essaie d'autres filtres
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onClick={(id) => navigate(`/events/${id}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
