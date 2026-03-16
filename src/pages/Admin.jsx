import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useEnums } from "../hooks/useEnums";
import ImageUpload from "../components/ImageUpload";
import OrganisateurForm from "../components/OrganisateurForm";
import EventCard from "../components/cards/EventCard";
import OrgCard from "../components/cards/OrgCard";
import EmptyState from "../components/ui/EmptyState";
import DeleteModal from "../components/ui/DeleteModal";

// ── Formulaire event ──────────────────────────────────────
function EventForm({
  initial,
  onSubmit,
  onCancel,
  regions,
  types,
  organisateurs,
}) {
  const [form, setForm] = useState(initial);
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

  const inputClass =
    "w-full border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500";
  const labelClass =
    "block text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 mb-1";

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

      <div className="grid grid-cols-2 gap-3">
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
        <button
          onClick={onCancel}
          className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 rounded-xl py-3 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-teal-600 dark:bg-teal-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>
    </div>
  );
}

// ── Formulaire event vide ─────────────────────────────────
const EMPTY_EVENT = {
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
};

// ── Page Admin ────────────────────────────────────────────
function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signOut } = useAuth();
  const { regions, types } = useEnums();

  const initialSelected = location.state?.editEvent || null;
  const initialMode = location.state?.editEvent ? "edit" : "list";

  const [tab, setTab] = useState("events");
  const [mode, setMode] = useState(initialMode);
  const [events, setEvents] = useState([]);
  const [organisateurs, setOrganisateurs] = useState([]);
  const [selected, setSelected] = useState(initialSelected);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (location.state?.editEvent) {
      window.history.replaceState({}, "");
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchEvents();
      fetchOrganisateurs();
    }
  }, [user]);

  async function fetchEvents() {
    setLoadingData(true);
    const { data } = await supabase
      .from("events")
      .select("*, organisateurs(nom)")
      .order("date", { ascending: true });
    if (data) setEvents(data);
    setLoadingData(false);
  }

  async function fetchOrganisateurs() {
    const { data } = await supabase
      .from("organisateurs")
      .select("*")
      .order("nom", { ascending: true });
    if (data) setOrganisateurs(data);
  }

  async function handleLogin() {
    setLoginError("");
    setLoginLoading(true);
    const error = await signIn(email, password);
    if (error) setLoginError("Email ou mot de passe incorrect");
    setLoginLoading(false);
  }

  async function handleCreateEvent(form) {
    const { organisateurs: _, ...formClean } = form;
    const { error } = await supabase.from("events").insert([
      {
        ...formClean,
        organisateur_id: formClean.organisateur_id || null,
      },
    ]);
    if (!error) fetchEvents();
    return error;
  }

  async function handleUpdateEvent(form) {
    const { organisateurs: _, ...formClean } = form;
    const { error } = await supabase
      .from("events")
      .update({
        ...formClean,
        organisateur_id: formClean.organisateur_id || null,
      })
      .eq("id", selected.id);
    if (!error) fetchEvents();
    return error;
  }

  async function handleCreateOrg(form) {
    const { error } = await supabase.from("organisateurs").insert([
      {
        ...form,
        region: form.region || null,
      },
    ]);
    if (!error) fetchOrganisateurs();
    return error;
  }

  async function handleUpdateOrg(form) {
    const { error } = await supabase
      .from("organisateurs")
      .update({
        ...form,
        region: form.region || null,
      })
      .eq("id", selected.id);
    if (!error) fetchOrganisateurs();
    return error;
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    const table = deleteConfirm.type === "event" ? "events" : "organisateurs";
    await supabase.from(table).delete().eq("id", deleteConfirm.item.id);
    setDeleteConfirm(null);
    if (deleteConfirm.type === "event") fetchEvents();
    else fetchOrganisateurs();
  }

  const inputClass =
    "w-full border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500";

  // ── Écran login ──
  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold tracking-tight text-gray-950 dark:text-slate-100 mb-1">
            🔒 Admin
          </h1>
          <p className="text-sm text-gray-400 dark:text-slate-500 mb-6">
            Accès réservé
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className={inputClass}
            />
          </div>
          {loginError && (
            <p className="text-red-500 text-sm mt-3">{loginError}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full bg-teal-600 text-white rounded-xl py-3 text-sm font-semibold mt-4 hover:bg-teal-700 transition-colors disabled:opacity-50"
          >
            {loginLoading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </div>
    );

  // ── Page admin ──
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 bg-hatch">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold tracking-tight text-gray-950 dark:text-slate-100">
            ⚙️ Admin
          </h1>
          <button
            onClick={signOut}
            className="text-sm text-red-400 hover:text-red-500"
          >
            Déconnexion
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-600 mb-6">
          {user.email}
        </p>

        {/* Onglets principaux */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "events", label: "🛹 Events" },
            { key: "organisateurs", label: "🏢 Organisateurs" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setMode("list");
              }}
              className={
                "px-4 py-2 rounded-xl text-sm font-medium transition-colors " +
                (tab === t.key
                  ? "bg-teal-600 dark:bg-teal-500 text-white"
                  : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Sous-onglets Liste / Créer */}
        {mode !== "edit" && (
          <div className="flex gap-2 mb-6">
            {[
              { key: "list", label: "📋 Liste" },
              { key: "create", label: "➕ Créer" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setMode(t.key)}
                className={
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors " +
                  (mode === t.key
                    ? "bg-gray-900 dark:bg-slate-100 text-white dark:text-slate-900"
                    : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400")
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* ── EVENTS ── */}
        {tab === "events" && (
          <>
            {mode === "list" && (
              <div className="space-y-3">
                {loadingData && (
                  <p className="text-center text-sm text-gray-400 dark:text-slate-600">
                    Chargement...
                  </p>
                )}
                {!loadingData && events.length === 0 && (
                  <EmptyState icon="🛹" title="Aucun événement" />
                )}
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    actions={
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(event);
                            setMode("edit");
                          }}
                          className="text-xs bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 px-3 py-1.5 rounded-lg font-medium hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm({ type: "event", item: event });
                          }}
                          className="text-xs bg-red-50 dark:bg-red-950 text-red-500 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    }
                  />
                ))}
              </div>
            )}

            {mode === "create" && (
              <EventForm
                initial={EMPTY_EVENT}
                onSubmit={handleCreateEvent}
                onCancel={() => setMode("list")}
                regions={regions}
                types={types}
                organisateurs={organisateurs}
              />
            )}

            {mode === "edit" && selected && (
              <>
                <button
                  onClick={() => {
                    setMode("list");
                    setSelected(null);
                  }}
                  className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-sm mb-4"
                >
                  ← Retour à la liste
                </button>
                <EventForm
                  initial={selected}
                  onSubmit={handleUpdateEvent}
                  onCancel={() => {
                    setMode("list");
                    setSelected(null);
                  }}
                  regions={regions}
                  types={types}
                  organisateurs={organisateurs}
                />
              </>
            )}
          </>
        )}

        {/* ── ORGANISATEURS ── */}
        {tab === "organisateurs" && (
          <>
            {mode === "list" && (
              <div className="space-y-3">
                {organisateurs.length === 0 && (
                  <EmptyState icon="🏢" title="Aucun organisateur" />
                )}
                {organisateurs.map((org) => (
                  <OrgCard
                    key={org.id}
                    org={org}
                    actions={
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(org);
                            setMode("edit");
                          }}
                          className="text-xs bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 px-3 py-1.5 rounded-lg font-medium hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm({ type: "org", item: org });
                          }}
                          className="text-xs bg-red-50 dark:bg-red-950 text-red-500 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    }
                  />
                ))}
              </div>
            )}

            {mode === "create" && (
              <OrganisateurForm
                initial={null}
                onSubmit={handleCreateOrg}
                onCancel={() => setMode("list")}
              />
            )}

            {mode === "edit" && selected && (
              <>
                <button
                  onClick={() => {
                    setMode("list");
                    setSelected(null);
                  }}
                  className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-sm mb-4"
                >
                  ← Retour à la liste
                </button>
                <OrganisateurForm
                  initial={selected}
                  onSubmit={handleUpdateOrg}
                  onCancel={() => {
                    setMode("list");
                    setSelected(null);
                  }}
                />
              </>
            )}
          </>
        )}

        {/* Modal suppression */}
        <DeleteModal
          item={deleteConfirm?.item || null}
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      </div>
    </div>
  );
}

export default Admin;
