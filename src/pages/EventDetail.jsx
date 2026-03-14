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
    if (error) console.error(error);
    else setEvent(data);
    setLoading(false);
  }

  const badgeClass = {
    Street: "bg-teal-700 dark:bg-teal-400 text-white dark:text-slate-900",
    Bowl: "bg-amber-700 dark:bg-amber-400 text-white dark:text-slate-900",
    Ramp: "bg-violet-700 dark:bg-violet-400 text-white dark:text-slate-900",
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-sm text-gray-400 dark:text-slate-600">
          Chargement...
        </p>
      </div>
    );

  if (!event)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-sm text-gray-400 dark:text-slate-600">
          Événement introuvable
        </p>
      </div>
    );

  const formattedDate = new Date(event.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(event.date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const fields = [
    { label: "Date", value: formattedDate, span: true },
    { label: "Heure", value: formattedTime },
    { label: "Type", value: event.type },
    { label: "Ville", value: event.ville || "—" },
    { label: "Lieu", value: event.location },
    { label: "Région", value: event.region, span: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header retour */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-3.5 flex items-center gap-3 bg-hatch">
        <button
          onClick={() => navigate(-1)}
          className="text-[13px] font-medium text-teal-600 dark:text-teal-400 bg-transparent border-none cursor-pointer p-0"
        >
          ← Retour
        </button>
        <span className="text-[13px] text-gray-400 dark:text-slate-600 truncate">
          {event.title}
        </span>
      </header>

      <div className="px-3 pt-3 pb-28 flex flex-col gap-3 bg-hatch min-h-screen">
        {/* Image 4:5 */}
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full rounded-xl object-cover border border-gray-200 dark:border-slate-700"
            style={{ aspectRatio: "4/5" }}
          />
        ) : (
          <div
            className="w-full rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center"
            style={{ aspectRatio: "4/5" }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-slate-700"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Titre + badge */}
        <div>
          <span
            className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-2 ${badgeClass[event.type] || "bg-gray-100 text-gray-700"}`}
          >
            {event.type}
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-balance text-gray-950 dark:text-slate-100 leading-tight">
            {event.title}
          </h1>
        </div>

        {/* Infos */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ label, value, span }) => (
              <div key={label} className={span ? "col-span-2" : "col-span-1"}>
                <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-0.5">
                  {label}
                </dt>
                <dd className="text-[14px] font-medium text-gray-900 dark:text-slate-100">
                  {value}
                </dd>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-2">
              Description
            </dt>
            <p className="text-[14px] text-gray-600 dark:text-slate-400 leading-relaxed">
              {event.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetail;
