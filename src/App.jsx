import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  // useState : crée une variable "events" et sa fonction de mise à jour
  const [events, setEvents] = useState([]);
  // loading : pour afficher un message pendant le chargement
  const [loading, setLoading] = useState(true);

  // useEffect : s'exécute automatiquement au chargement du composant
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    // On demande à Supabase tous les events, triés par date
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Erreur :", error);
    } else {
      setEvents(data);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>🛹 Skate Events</h1>

      {loading && <p>Chargement des events...</p>}

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>📍 {event.location}</p>
          <p>
            📅{" "}
            {new Date(event.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      ))}

      {!loading && events.length === 0 && (
        <p>Aucun événement pour le moment.</p>
      )}
    </div>
  );
}

export default App;
