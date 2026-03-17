import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { supabaseQuery } from "../utils/supabaseHelpers";

export function useEventsByOrganisateur(organisateurId) {
  const [upcoming, setUpcoming] = useState([]);
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (organisateurId) fetchEvents();
  }, [organisateurId]);

  async function fetchEvents() {
    setLoading(true);
    setError(null);

    const now = new Date().toISOString();

    // Events à venir
    const { data: upcomingData, message: upcomingError } = await supabaseQuery(
      () =>
        supabase
          .from("events")
          .select("*")
          .eq("organisateur_id", organisateurId)
          .gte("date", now)
          .order("date", { ascending: true }),
      "fetchUpcomingEvents",
    );

    // Events passés
    const { data: archivesData, message: archivesError } = await supabaseQuery(
      () =>
        supabase
          .from("events")
          .select("*")
          .eq("organisateur_id", organisateurId)
          .lt("date", now)
          .order("date", { ascending: false })
          .limit(5),
      "fetchArchivesEvents",
    );

    if (upcomingError || archivesError) {
      setError(upcomingError || archivesError);
    } else {
      setUpcoming(upcomingData || []);
      setArchives(archivesData || []);
    }

    setLoading(false);
  }

  return { upcoming, archives, loading, error };
}
