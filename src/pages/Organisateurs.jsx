import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import OrgCard from "../components/cards/OrgCard";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";

function Organisateurs() {
  const [organisateurs, setOrganisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchOrganisateurs();
  }, []);

  async function fetchOrganisateurs() {
    setLoading(true);
    const { data, error } = await supabase
      .from("organisateurs")
      .select("*")
      .order("nom", { ascending: true });
    if (error) console.error(error);
    else setOrganisateurs(data);
    setLoading(false);
  }

  // ── Vue détail ──
  if (selected)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-3.5 flex items-center gap-3 bg-hatch">
          <button
            onClick={() => setSelected(null)}
            className="text-[13px] font-medium text-teal-600 dark:text-teal-400 bg-transparent border-none cursor-pointer p-0"
          >
            ← Retour
          </button>
          <span className="text-[13px] text-gray-400 dark:text-slate-600 truncate">
            {selected.nom}
          </span>
        </header>

        <div className="px-3 pt-3 pb-28 flex flex-col gap-3 bg-hatch min-h-screen">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h1 className="text-lg font-bold tracking-tight text-gray-950 dark:text-slate-100">
                  {selected.nom}
                </h1>
                <Badge type="statut" value={selected.statut} size="sm" />
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <Badge type="typeOrg" value={selected.type_org} size="sm" />
              </div>

              <p className="text-xs text-gray-400 dark:text-slate-500">
                {selected.ville ? selected.ville : ""}
                {selected.region
                  ? (selected.ville ? " · " : "") + selected.region
                  : ""}
              </p>

              {selected.description && (
                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mt-3">
                  {selected.description}
                </p>
              )}
            </div>

            <div className="px-4 py-3 flex flex-col gap-2.5">
              {selected.mail && (
                <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
                  <span>✉️</span>
                  <span className="truncate">{selected.mail}</span>
                </div>
              )}
              {selected.tel && (
                <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
                  <span>📞</span>
                  <span>{selected.tel}</span>
                </div>
              )}
              {selected.lien && (
                <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
                  <span>🔗</span>
                  <span className="truncate">{selected.lien}</span>
                </div>
              )}
              {(selected.adresse || selected.code_postal || selected.ville) && (
                <div className="flex items-start gap-2.5 text-xs text-gray-400 dark:text-slate-500">
                  <span>📍</span>
                  <span>
                    {[selected.adresse, selected.code_postal, selected.ville]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

  // ── Vue liste ──
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 pt-5 pb-4 bg-hatch">
        <h1 className="text-xl font-bold tracking-tight uppercase text-gray-950 dark:text-slate-100">
          ORGA
          <span className="text-teal-600 dark:text-teal-400">NISATEURS</span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">
          Les organisateurs d'événements
        </p>
      </header>

      <main className="px-3 pt-3 pb-28 bg-hatch min-h-screen">
        {loading && (
          <p className="text-center text-sm text-gray-400 dark:text-slate-600 mt-16">
            Chargement...
          </p>
        )}

        {!loading && organisateurs.length === 0 && (
          <EmptyState icon="🏢" title="Aucun organisateur" />
        )}

        <div className="flex flex-col gap-2.5">
          {organisateurs.map((org) => (
            <OrgCard
              key={org.id}
              org={org}
              onClick={(org) => setSelected(org)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Organisateurs;
