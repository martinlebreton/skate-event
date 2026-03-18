import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganisateurs } from "../hooks/useOrganisateurs";
import { useEnums } from "../hooks/useEnums";
import OrgCard from "../components/cards/OrgCard";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";

function Organisateurs() {
  const { organisateurs, loading, fetchError } = useOrganisateurs();
  const { regions } = useEnums();
  const [selectedRegion, setSelectedRegion] = useState("");
  const navigate = useNavigate();

  const filtered = selectedRegion
    ? organisateurs.filter((o) => o.region === selectedRegion)
    : organisateurs;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header sticky */}
      <div className="sticky top-0 z-40">
        <PageHeader
          title="ORGA"
          accent="NISATEURS"
          subtitle="Les organisateurs d'événements"
        />

        {/* Filtre région */}
        <div className="flex gap-2 px-3 py-2.5 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={
              "font-sans text-[13px] font-medium px-3 py-1.5 rounded-lg border appearance-none cursor-pointer shrink-0 transition-colors duration-150 " +
              (selectedRegion
                ? "border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400"
                : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-400")
            }
          >
            <option value="">Toutes les régions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <main className="px-3 pt-3 pb-28 min-h-screen">
        {loading && (
          <p className="text-center text-sm text-slate-400 dark:text-slate-600 mt-16">
            Chargement...
          </p>
        )}

        {!loading && fetchError && <EmptyState error={fetchError} />}

        {!loading && !fetchError && filtered.length === 0 && (
          <EmptyState
            icon="🏢"
            title="Aucun organisateur"
            subtitle={selectedRegion ? "Essaie une autre région" : ""}
          />
        )}

        {!loading && !fetchError && (
          <div className="flex flex-col gap-2.5">
            {filtered.map((org) => (
              <OrgCard
                key={org.id}
                org={org}
                onClick={(org) => navigate("/organisateurs/" + org.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Organisateurs;
