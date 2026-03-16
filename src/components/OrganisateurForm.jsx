import { useState } from "react";
import { useEnums } from "../hooks/useEnums";
import {
  inputClass,
  labelClass,
  btnPrimary,
  btnSecondary,
} from "./forms/formStyles";

const EMPTY_ORG = {
  nom: "",
  type_org: "",
  mail: "",
  tel: "",
  description: "",
  adresse: "",
  code_postal: "",
  ville: "",
  region: "",
  lien: "",
  statut: "Compte en attente",
};

function OrganisateurForm({ initial, onSubmit, onCancel }) {
  const { regions, typesOrg, statutsOrg } = useEnums();
  const [form, setForm] = useState(initial || EMPTY_ORG);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError("");
    if (!form.nom || !form.type_org || !form.statut) {
      setError("Merci de remplir les champs obligatoires.");
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
          ✅ Organisateur sauvegardé !
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
      {/* Nom */}
      <div>
        <label className={labelClass}>
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          placeholder="Ex: Association Skate Bretagne"
          className={inputClass}
        />
      </div>

      {/* Type organisation */}
      <div>
        <label className={labelClass}>
          Type <span className="text-red-500">*</span>
        </label>
        <select
          name="type_org"
          value={form.type_org}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Sélectionne un type</option>
          {typesOrg.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Statut */}
      <div>
        <label className={labelClass}>
          Statut <span className="text-red-500">*</span>
        </label>
        <select
          name="statut"
          value={form.statut}
          onChange={handleChange}
          className={inputClass}
        >
          {statutsOrg.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Région */}
      <div>
        <label className={labelClass}>Région</label>
        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Nationale (sans région)</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Mail + Tel */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            name="mail"
            value={form.mail}
            onChange={handleChange}
            placeholder="contact@asso.fr"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Téléphone</label>
          <input
            type="tel"
            name="tel"
            value={form.tel}
            onChange={handleChange}
            placeholder="06 00 00 00 00"
            className={inputClass}
          />
        </div>
      </div>

      {/* Adresse */}
      <div>
        <label className={labelClass}>Adresse</label>
        <input
          type="text"
          name="adresse"
          value={form.adresse}
          onChange={handleChange}
          placeholder="12 rue du Skatepark"
          className={inputClass}
        />
      </div>

      {/* Code postal + Ville */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Code postal</label>
          <input
            type="text"
            name="code_postal"
            value={form.code_postal}
            onChange={handleChange}
            placeholder="35000"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Ville</label>
          <input
            type="text"
            name="ville"
            value={form.ville}
            onChange={handleChange}
            placeholder="Rennes"
            className={inputClass}
          />
        </div>
      </div>

      {/* Lien */}
      <div>
        <label className={labelClass}>Site web / Lien</label>
        <input
          type="url"
          name="lien"
          value={form.lien}
          onChange={handleChange}
          placeholder="https://..."
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Présentation de l'organisation..."
          rows={3}
          className={inputClass + " resize-none"}
        />
      </div>

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

export default OrganisateurForm;
