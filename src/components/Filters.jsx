import { useEnums } from "../hooks/useEnums";

function Filters({
  selectedRegion,
  selectedType,
  onRegionChange,
  onTypeChange,
}) {
  const { regions, types, loading } = useEnums();

  if (loading)
    return (
      <div className="px-4 py-3 text-xs text-gray-400 dark:text-slate-600 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        Chargement...
      </div>
    );

  const selectClass = (active) => `
    font-sans text-[13px] font-medium px-3 py-1.5 rounded-lg border
    appearance-none cursor-pointer shrink-0 transition-colors duration-150
    ${
      active
        ? "border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400"
        : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-400"
    }
  `;

  return (
    <div className="flex gap-2 px-3 py-2.5 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 overflow-x-auto bg-hatch">
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className={selectClass(!!selectedType)}
      >
        <option value="">Tous les types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className={selectClass(!!selectedRegion)}
      >
        <option value="">Toutes les régions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
