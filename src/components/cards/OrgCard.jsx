import Badge from "../ui/Badge";
import { text, card } from "../ui/designTokens";
import { subheading, smallText, hintText } from "../ui/typography";

function OrgCard({ org, onClick, actions }) {
  return (
    <div
      onClick={() => onClick?.(org)}
      className={
        card +
        " overflow-hidden transition-shadow duration-150 " +
        (onClick
          ? "cursor-pointer hover:shadow-md dark:hover:shadow-slate-900/50"
          : "")
      }
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <p className={subheading + " truncate"}>{org.nom}</p>
            <p className={"text-xs " + text.muted + " mt-0.5"}>
              {org.ville ? org.ville : ""}
              {org.region ? (org.ville ? " · " : "") + org.region : ""}
            </p>
          </div>
          <Badge type="statut" value={org.statut} size="sm" />
        </div>

        <div className="mt-2">
          <Badge type="typeOrg" value={org.type_org} size="sm" />
        </div>

        {org.description && (
          <p
            className={
              "text-xs " + text.muted + " mt-2 line-clamp-2 leading-relaxed"
            }
          >
            {org.description}
          </p>
        )}

        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
          {org.mail && (
            <span
              className={"text-xs " + text.muted + " flex items-center gap-1"}
            >
              ✉️ {org.mail}
            </span>
          )}
          {org.tel && (
            <span
              className={"text-xs " + text.muted + " flex items-center gap-1"}
            >
              📞 {org.tel}
            </span>
          )}
        </div>
      </div>

      {actions && (
        <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700 flex gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

export default OrgCard;
