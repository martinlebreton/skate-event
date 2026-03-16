import { useState } from "react";
import { supabase } from "../supabaseClient";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*, organisateurs(nom)")
      .order("date", { ascending: true });
    if (error) console.error("Erreur fetchEvents :", error);
    else setEvents(data);
    setLoading(false);
  }

  async function createEvent(form) {
    const { organisateurs: _, ...formClean } = form;
    const { error } = await supabase.from("events").insert([
      {
        ...formClean,
        organisateur_id: formClean.organisateur_id || null,
      },
    ]);
    if (!error) await fetchEvents();
    return error;
  }

  async function updateEvent(id, form) {
    const { organisateurs: _, ...formClean } = form;
    const { error } = await supabase
      .from("events")
      .update({
        ...formClean,
        organisateur_id: formClean.organisateur_id || null,
      })
      .eq("id", id);
    if (!error) await fetchEvents();
    return error;
  }

  async function deleteEvent(id) {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) await fetchEvents();
    return error;
  }

  return {
    events,
    loading,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
