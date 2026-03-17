import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import EventCard from "../components/cards/EventCard";
import Filters from "../components/ui/Filters";
import EmptyState from "../components/ui/EmptyState";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, [selectedRegion, selectedType]);

  async function fetchEvents() {
    setLoading(true);
    setFetchError(null);
    let query = supabase
      .from("events")
      .select("*")
      .gte("date", new Date().toISOString())
      .order("date", { ascending: true })
      .limit(10);
    if (selectedRegion) query = query.eq("region", selectedRegion);
    if (selectedType) query = query.eq("type", selectedType);
    const { data, error } = await query;
    if (error) setFetchError(error.message);
    else setEvents(data);
    setLoading(false);
  }

  function handleEdit(e, event) {
    e.stopPropagation();
    navigate("/admin", { state: { editEvent: event } });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 pt-5 pb-4 bg-hatch">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase text-gray-950 dark:text-slate-100">
              SKATE<span className="text-teal-600 dark:text-teal-400">EVT</span>
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">
              Les prochains événements en France
            </p>
          </div>
          {user && (
            <button
              onClick={() => navigate("/admin")}
              className="text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 px-3 py-1.5 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
            >
              ⚙️ Admin
            </button>
          )}
        </div>
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

        {!loading && fetchError && <EmptyState error={fetchError} />}

        {!loading && !fetchError && events.length === 0 && (
          <EmptyState
            icon="🛹"
            title="Aucun événement"
            subtitle="Essaie d'autres filtres"
          />
        )}

        {!loading && !fetchError && (
          <div className="flex flex-col gap-2.5">
            {events.map((event, index) => (
              <div key={event.id} className="relative">
                <EventCard
                  event={event}
                  index={index}
                  onClick={(id) => navigate("/events/" + id)}
                />
                {user && (
                  <button
                    onClick={(e) => handleEdit(e, event)}
                    className="absolute top-2 right-2 text-[10px] font-medium bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 px-2 py-1 rounded-lg hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors shadow-sm"
                  >
                    ✏️ Modifier
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
