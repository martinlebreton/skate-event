import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { supabaseQuery } from "../utils/supabaseHelpers";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    setFetchError(null);
    const { data, message } = await supabaseQuery(
      () =>
        supabase
          .from("events")
          .select("*, organisateurs(nom)")
          .order("date", { ascending: true }),
      "fetchEvents",
    );
    if (data) setEvents(data);
    else setFetchError(message);
    setLoading(false);
  }

  async function createEvent(form) {
    const { organisateurs: _, ...formClean } = form;
    const { error, message } = await supabaseQuery(
      () =>
        supabase.from("events").insert([
          {
            ...formClean,
            organisateur_id: formClean.organisateur_id || null,
          },
        ]),
      "createEvent",
    );
    if (!error) await fetchEvents();
    return error ? { message } : null;
  }

  async function updateEvent(id, form) {
    const { organisateurs: _, ...formClean } = form;
    const { error, message } = await supabaseQuery(
      () =>
        supabase
          .from("events")
          .update({
            ...formClean,
            organisateur_id: formClean.organisateur_id || null,
          })
          .eq("id", id),
      "updateEvent",
    );
    if (!error) await fetchEvents();
    return error ? { message } : null;
  }

  async function deleteEvent(id) {
    const { error, message } = await supabaseQuery(
      () => supabase.from("events").delete().eq("id", id),
      "deleteEvent",
    );
    if (!error) await fetchEvents();
    return error ? { message } : null;
  }

  return {
    events,
    loading,
    fetchError,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
