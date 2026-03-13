import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useEnums } from "../hooks/useEnums";
import ImageUpload from "../components/ImageUpload";

// Formulaire réutilisable pour création ET modification
function EventForm({ initial, onSubmit, onCancel, regions, types }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setError("");
    if (
      !form.title ||
      !form.date ||
      !form.ville ||
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
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <p className="text-green-700 font-medium mb-3">
          ✅ Événement sauvegardé !
        </p>
        <button onClick={onCancel} className="text-blue-600 text-sm underline">
          Retour à la liste
        </button>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex: Street Session Paris"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Décris l'événement..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          name="date"
          value={form.date ? form.date.slice(0, 16) : ""}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ville <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="ville"
          value={form.ville}
          onChange={handleChange}
          placeholder="Ex: Paris, Milan, Beaupréau"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lieu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Ex: Skatepark Trocadéro, Bowl de Tanchet"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Région <span className="text-red-500">*</span>
        </label>
        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionne une région</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type <span className="text-red-500">*</span>
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionne un type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Image actuelle */}
      {form.image_url && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image actuelle
          </label>
          <img
            src={form.image_url}
            alt="Image actuelle"
            className="w-full h-40 object-cover rounded-xl"
          />
        </div>
      )}

      <ImageUpload onUpload={(url) => setForm({ ...form, image_url: url })} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-3 text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>
    </div>
  );
}

// Formulaire vide pour la création
const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  ville: "",
  location: "",
  region: "",
  type: "",
  image_url: "",
};

function Admin() {
  const navigate = useNavigate();
  const { user, signIn, signOut } = useAuth();
  const { regions, types } = useEnums();

  // Mode actuel : 'list', 'create', ou 'edit'
  const [mode, setMode] = useState("list");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  async function fetchEvents() {
    setLoadingEvents(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    if (!error) setEvents(data);
    setLoadingEvents(false);
  }

  async function handleLogin() {
    setLoginError("");
    setLoginLoading(true);
    const error = await signIn(email, password);
    if (error) setLoginError("Email ou mot de passe incorrect");
    setLoginLoading(false);
  }

  async function handleCreate(form) {
    const { error } = await supabase.from("events").insert([form]);
    if (!error) fetchEvents();
    return error;
  }

  async function handleUpdate(form) {
    const { error } = await supabase
      .from("events")
      .update(form)
      .eq("id", selectedEvent.id);
    if (!error) fetchEvents();
    return error;
  }

  async function handleDelete(id) {
    await supabase.from("events").delete().eq("id", id);
    setDeleteConfirm(null);
    fetchEvents();
  }

  // Formate la date pour l'affichage
  function formatDate(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // --- Écran de connexion ---
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">🔒 Admin</h1>
          <p className="text-gray-500 text-sm mb-6">Accès réservé</p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {loginError && (
            <p className="text-red-500 text-sm mt-3">{loginError}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-700 transition-colors mt-4 disabled:opacity-50"
          >
            {loginLoading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </div>
    );
  }

  // --- Page admin ---
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">⚙️ Admin</h1>
          <button onClick={signOut} className="text-sm text-red-400">
            Déconnexion
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-6">{user.email}</p>

        {/* Onglets */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "list", label: "📋 Liste" },
            { key: "create", label: "➕ Créer" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMode(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                mode === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mode Liste */}
        {mode === "list" && (
          <div className="space-y-3">
            {loadingEvents && (
              <p className="text-center text-gray-400">Chargement...</p>
            )}
            {!loadingEvents && events.length === 0 && (
              <p className="text-center text-gray-400">Aucun événement.</p>
            )}
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      📅 {formatDate(event.date)} · {event.type} ·{" "}
                      {event.region}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setMode("edit");
                      }}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(event)}
                      className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mode Créer */}
        {mode === "create" && (
          <EventForm
            initial={EMPTY_FORM}
            onSubmit={handleCreate}
            onCancel={() => setMode("list")}
            regions={regions}
            types={types}
          />
        )}

        {/* Mode Modifier */}
        {mode === "edit" && selectedEvent && (
          <>
            <button
              onClick={() => setMode("list")}
              className="flex items-center gap-1 text-blue-600 text-sm mb-4"
            >
              ← Retour à la liste
            </button>
            <EventForm
              initial={selectedEvent}
              onSubmit={handleUpdate}
              onCancel={() => setMode("list")}
              regions={regions}
              types={types}
            />
          </>
        )}

        {/* Modal confirmation suppression */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Supprimer l'event ?
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                <span className="font-medium text-gray-700">
                  "{deleteConfirm.title}"
                </span>{" "}
                sera définitivement supprimé.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-3 text-sm font-semibold"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  className="flex-1 bg-red-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
