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
      <p className="text-sm text-gray-400 mb-6">Chargement des filtres...</p>
    );

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="flex-shrink-0 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Toutes les régions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="flex-shrink-0 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Tous les types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
