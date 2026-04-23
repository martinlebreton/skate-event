import { useState } from "react";
import { useEnums } from "../../hooks/useEnums";
import ImageUpload from "../ui/ImageUpload";
import { inputClass, labelClass, btnPrimary, btnSecondary } from "./formStyles";

export const EMPTY_EVENT = {
  title: "",
  description: "",
  date: "",
  date_fin: "",
  location: "",
  ville: "",
  region: "",
  type: "",
  organisateur_id: "",
  image_url: "",
  infos_bar: false,
  infos_restauration: false,
  infos_parking: false,
  infos_sanitaire: false,
  infos_complementaires: "",
  event_tarif: "Gratuit",
  format: "",
};

function EventForm({
  initial,
  onSubmit,
  onCancel,
  regions,
  types,
  organisateurs,
}) {
  const { tarifs, eventFormats } = useEnums();
  const [form, setForm] = useState(initial || EMPTY_EVENT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit() {
    setError("");
    if (
      !form.title ||
      !form.date ||
      !form.location ||
      !form.region ||
      !form.type
    ) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    const err = await onSubmit(form);
    if (err) setError("Erreur : " + err.message);
    else setSuccess(true);
    setLoading(false);
  }

  if (success)
    return (
      <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 text-center">
        <p className="text-teal-700 dark:text-teal-400 font-medium mb-3">
          ✅ Événement sauvegardé !
        </p>
        <button
          onClick={onCancel}
          className="text-teal-600 dark:text-teal-400 text-sm underline"
        >
          Retour à la liste
        </button>
      </div>
    );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-4">
      <div>
        <label className={labelClass}>
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex: Street Session Paris"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Décris l'événement..."
          rows={3}
          className={inputClass + " resize-none"}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label className={labelClass}>
            Début <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="date"
            value={form.date ? form.date.slice(0, 16) : ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Fin</label>
          <input
            type="datetime-local"
            name="date_fin"
            value={form.date_fin ? form.date_fin.slice(0, 16) : ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Lieu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Ex: Skatepark Trocadéro"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Ville</label>
        <input
          type="text"
          name="ville"
          value={form.ville || ""}
          onChange={handleChange}
          placeholder="Ex: Paris"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>
            Région <span className="text-red-500">*</span>
          </label>
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Sélectionne</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            Type <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Sélectionne</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarif */}
      <div>
        <label className={labelClass}>
          Tarif <span className="text-red-500">*</span>
        </label>
        <select
          name="event_tarif"
          value={form.event_tarif || ""}
          onChange={handleChange}
          className={inputClass}
        >
          {tarifs.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Format</label>
        <select
          name="format"
          value={form.format || ""}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Sélectionne</option>
          {(eventFormats.length > 0
            ? eventFormats
            : [
                "Jam",
                "Session libre",
                "Contest",
                "Compétition fédérale",
                "Démo",
                "Stage",
              ]
          ).map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Organisateur</label>
        <select
          name="organisateur_id"
          value={form.organisateur_id || ""}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Aucun organisateur</option>
          {organisateurs.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Infos pratiques</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            { name: "infos_bar", label: "🍺 Bar" },
            { name: "infos_restauration", label: "🍔 Restauration" },
            { name: "infos_parking", label: "🅿️ Parking" },
            { name: "infos_sanitaire", label: "🚻 Sanitaires" },
          ].map(({ name, label }) => (
            <label
              key={name}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 cursor-pointer"
            >
              <input
                type="checkbox"
                name={name}
                checked={!!form[name]}
                onChange={handleChange}
                className="w-4 h-4 accent-teal-600"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Infos complémentaires</label>
        <textarea
          name="infos_complementaires"
          value={form.infos_complementaires || ""}
          onChange={handleChange}
          placeholder="Autres informations utiles..."
          rows={2}
          className={inputClass + " resize-none"}
        />
      </div>

      {form.image_url && (
        <div>
          <label className={labelClass}>Image actuelle</label>
          <img
            src={form.image_url}
            alt="Image"
            className="w-full rounded-xl object-cover border border-gray-200 dark:border-slate-700"
            style={{ aspectRatio: "4/5" }}
          />
        </div>
      )}

      <ImageUpload onUpload={(url) => setForm({ ...form, image_url: url })} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button onClick={onCancel} className={btnSecondary}>
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={btnPrimary}
        >
          {loading ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>
    </div>
  );
}

export default EventForm;
