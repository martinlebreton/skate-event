import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEnums } from "../hooks/useEnums";
import { useEvents } from "../hooks/useEvents";
import { useOrganisateurs } from "../hooks/useOrganisateurs";
import EventForm, { EMPTY_EVENT } from "../components/forms/EventForm";
import OrganisateurForm from "../components/forms/OrganisateurForm";
import EventCard from "../components/cards/EventCard";
import OrgCard from "../components/cards/OrgCard";
import EmptyState from "../components/ui/EmptyState";
import DeleteModal from "../components/ui/DeleteModal";
import { inputClass } from "../components/forms/formStyles";

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signOut } = useAuth();
  const { regions, types } = useEnums();

  const {
    events,
    loading: loadingEvents,
    fetchError: eventsError,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useEvents();

  const {
    organisateurs,
    loading: loadingOrgs,
    fetchError: orgsError,
    createOrganisateur,
    updateOrganisateur,
    deleteOrganisateur,
  } = useOrganisateurs();

  const initialSelected = location.state?.editEvent || null;
  const initialMode = location.state?.editEvent ? "edit" : "list";

  const [tab, setTab] = useState("events");
  const [mode, setMode] = useState(initialMode);
  const [selected, setSelected] = useState(initialSelected);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (location.state?.editEvent) {
      window.history.replaceState({}, "");
    }
  }, []);

  async function handleLogin() {
    setLoginError("");
    setLoginLoading(true);
    const error = await signIn(email, password);
    if (error) setLoginError("Email ou mot de passe incorrect");
    setLoginLoading(false);
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === "event") {
      await deleteEvent(deleteConfirm.item.id);
    } else {
      await deleteOrganisateur(deleteConfirm.item.id);
    }
    setDeleteConfirm(null);
  }

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
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-teal-600 dark:text-teal-400 font-medium"
            >
              ← Accueil
            </button>
            <h1 className="text-xl font-bold tracking-tight text-gray-950 dark:text-slate-100">
              ⚙️ Admin
            </h1>
          </div>
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
                {loadingEvents && (
                  <p className="text-center text-sm text-gray-400 dark:text-slate-600">
                    Chargement...
                  </p>
                )}
                {!loadingEvents && eventsError && (
                  <EmptyState error={eventsError} />
                )}
                {!loadingEvents && !eventsError && events.length === 0 && (
                  <EmptyState icon="🛹" title="Aucun événement" />
                )}
                {!loadingEvents &&
                  !eventsError &&
                  events.map((event) => (
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
                onSubmit={createEvent}
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
                  onSubmit={(form) => updateEvent(selected.id, form)}
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
                {loadingOrgs && (
                  <p className="text-center text-sm text-gray-400 dark:text-slate-600">
                    Chargement...
                  </p>
                )}
                {!loadingOrgs && orgsError && <EmptyState error={orgsError} />}
                {!loadingOrgs && !orgsError && organisateurs.length === 0 && (
                  <EmptyState icon="🏢" title="Aucun organisateur" />
                )}
                {!loadingOrgs &&
                  !orgsError &&
                  organisateurs.map((org) => (
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
                onSubmit={createOrganisateur}
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
                  onSubmit={(form) => updateOrganisateur(selected.id, form)}
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
