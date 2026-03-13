import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useEnums } from "../hooks/useEnums";
import ImageUpload from "../components/ImageUpload";

function Admin() {
  const navigate = useNavigate();
  const { user, signIn, signOut } = useAuth();
  const { regions, types } = useEnums();

  // État login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // État formulaire
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    region: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Connexion
  async function handleLogin() {
    setLoginError("");
    setLoginLoading(true);
    const error = await signIn(email, password);
    if (error) setLoginError("Email ou mot de passe incorrect");
    setLoginLoading(false);
  }

  // Mise à jour formulaire
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Soumission
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
    const { error } = await supabase.from("events").insert([form]);
    if (error) setError("Erreur : " + error.message);
    else {
      setSuccess(true);
      setForm({
        title: "",
        description: "",
        date: "",
        location: "",
        region: "",
        type: "",
      });
    }
    setLoading(false);
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

  // --- Formulaire admin ---
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            ➕ Nouvel événement
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-blue-600"
            >
              ← Retour
            </button>
            <button onClick={signOut} className="text-sm text-red-400">
              Déconnexion
            </button>
          </div>
        </div>

        {/* Email connecté */}
        <p className="text-xs text-gray-400 mb-4">Connecté : {user.email}</p>

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
              value={form.date}
              onChange={handleChange}
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
              placeholder="Ex: Skatepark Trocadéro, Paris"
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-700 text-sm font-medium">
                ✅ Événement créé avec succès !
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-green-600 text-sm underline mt-1"
              >
                Ajouter un autre événement
              </button>
            </div>
          )}

          {/* Image */}
          <ImageUpload
            onUpload={(url) => setForm({ ...form, image_url: url })}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Création en cours..." : "Créer l'événement"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
