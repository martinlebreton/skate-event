import Badge from "../ui/Badge";
import ContactBlock from "../ui/ContactBlock";
import { text, card } from "../ui/designTokens";
import { subheading } from "../ui/typography";

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
            <p className={"text-xs mt-0.5 " + text.muted}>
              {org.ville ? org.ville : ""}
              {org.region ? (org.ville ? " · " : "") + org.region : ""}
            </p>
          </div>
          <Badge type="statut" value={org.statut} size="sm" />
        </div>

        <div className="mt-2 mb-3">
          <Badge type="typeOrg" value={org.type_org} size="sm" />
        </div>

        {org.description && (
          <p
            className={
              "text-xs mt-2 line-clamp-2 leading-relaxed " + text.muted
            }
          >
            {org.description}
          </p>
        )}

        <div className="mt-3">
          <ContactBlock mail={org.mail} tel={org.tel} />
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
