import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import EventCard from "../components/cards/EventCard";
import Filters from "../components/ui/Filters";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";
import { bg } from "../components/ui/designTokens";
import Banner from "../components/ui/Banner";

const PAGE_SIZE = 10;

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { dark, toggleDark } = useTheme();

  // Ref sur le sentinel — élément invisible en bas de liste
  const sentinelRef = useRef(null);

  // Reset quand les filtres changent
  useEffect(() => {
    setEvents([]);
    setPage(0);
    setHasMore(true);
    fetchEvents(0, true);
  }, [selectedRegion, selectedType]);

  async function fetchEvents(pageIndex = 0, reset = false) {
    if (pageIndex === 0) setLoading(true);
    else setLoadingMore(true);
    setFetchError(null);

    const from = pageIndex * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("events")
      .select("*, organisateurs(nom)")
      .gte("date", new Date().toISOString())
      .order("date", { ascending: true })
      .range(from, to);

    if (selectedRegion) query = query.eq("region", selectedRegion);
    if (selectedType) query = query.eq("type", selectedType);

    const { data, error } = await query;

    if (error) {
      setFetchError(error.message);
    } else {
      // Si on reçoit moins que PAGE_SIZE → plus rien à charger
      setHasMore(data.length === PAGE_SIZE);
      setEvents((prev) => (reset ? data : [...prev, ...data]));
    }

    setLoading(false);
    setLoadingMore(false);
  }

  // Charge la page suivante
  const loadMore = useCallback(() => {
    if (!loadingMore && !loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchEvents(nextPage);
    }
  }, [loadingMore, loading, hasMore, page]);

  // IntersectionObserver — surveille le sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  function handleEdit(e, event) {
    e.stopPropagation();
    navigate("/admin", { state: { editEvent: event } });
  }

  const DarkModeButton = () => (
    <button
      onClick={toggleDark}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
    >
      {dark ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-400"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 3v1m0 16v1M4.22 4.22l.71.71m12.73 12.73.71.71M3 12h1m16 0h1M4.93 19.07l.71-.71M18.36 5.64l.71-.71" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-400"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      )}
      <span className="text-[10px] font-medium text-slate-400">
        {dark ? "Light" : "Dark"}
      </span>
    </button>
  );

  return (
    <div className={"min-h-screen " + bg.page}>
      <div className="sticky top-0 z-40">
        <PageHeader
          title="SKATE"
          accent="EVENT"
          subtitle="Les événements skate en France"
          left={
            <img
              src="/logo-skateevent.svg"
              alt="SkateEvent"
              className="w-10 h-10 rounded-lg shrink-0"
            />
          }
          right={<DarkModeButton />}
        />
        <Filters
          selectedRegion={selectedRegion}
          selectedType={selectedType}
          onRegionChange={(v) => setSelectedRegion(v)}
          onTypeChange={(v) => setSelectedType(v)}
        />
      </div>

      <main className="px-3 pt-3 pb-28 min-h-screen">
        {/* Bannière bienvenue */}
        <Banner
          bg="bg-teal-600 dark:bg-teal-600 text-gray-100 dark:text-slate-100"
          icon="👋"
          title="Bienvenue sur SkateEvent"
          text="Retrouve les prochains contests et événements skate en France."
          className="mb-1"
        />

        {/* Chargement initial */}
        {loading && (
          <p className="text-center text-sm text-slate-400 dark:text-slate-600 mt-16">
            Chargement...
          </p>
        )}

        {/* Erreur */}
        {!loading && fetchError && <EmptyState error={fetchError} />}

        {/* Aucun résultat */}
        {!loading && !fetchError && events.length === 0 && (
          <EmptyState
            icon="🛹"
            title="Aucun événement"
            subtitle="Essaie d'autres filtres"
          />
        )}

        {/* Liste */}
        {!loading && !fetchError && (
          <div className="flex flex-col gap-4">
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

            {/* Sentinel — élément invisible qui déclenche le chargement */}
            {hasMore && (
              <div
                ref={sentinelRef}
                className="h-8 flex items-center justify-center"
              >
                {loadingMore && (
                  <p className="text-sm text-slate-400 dark:text-slate-600">
                    Chargement...
                  </p>
                )}
              </div>
            )}

            {/* Fin de liste */}
            {!hasMore && events.length > 0 && (
              <p className="text-center text-xs text-slate-300 dark:text-slate-700 py-4">
                — Tous les événements sont affichés —
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
