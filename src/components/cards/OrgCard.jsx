import Badge from "../ui/Badge";

function OrgCard({ org, onClick, actions }) {
  return (
    <div
      onClick={() => onClick?.(org)}
      className={
        "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden transition-shadow duration-150 " +
        (onClick
          ? "cursor-pointer hover:shadow-md dark:hover:shadow-slate-900/50"
          : "")
      }
    >
      {/* Contenu principal */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm truncate">
              {org.nom}
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
              {org.ville ? org.ville : ""}
              {org.region ? (org.ville ? " · " : "") + org.region : ""}
            </p>
          </div>
          <Badge type="statut" value={org.statut} size="sm" />
        </div>

        {/* Badges type org */}
        <div className="mt-2">
          <Badge type="typeOrg" value={org.type_org} size="sm" />
        </div>

        {/* Description */}
        {org.description && (
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {org.description}
          </p>
        )}

        {/* Contacts résumés */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
          {org.mail && (
            <span className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1">
              ✉️ {org.mail}
            </span>
          )}
          {org.tel && (
            <span className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1">
              📞 {org.tel}
            </span>
          )}
        </div>
      </div>

      {/* Zone d'actions optionnelle */}
      {actions && (
        <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700 flex gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

export default OrgCard;
