import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEventsByOrganisateur } from "../hooks/useEventsByOrganisateur";
import EventCard from "../components/cards/EventCard";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import LoadingState from "../components/ui/LoadingState";
import ContactBlock from "../components/ui/ContactBlock";
import SectionTitle from "../components/ui/SectionTitle";
import PageHeader from "../components/ui/PageHeader";
import { ShareButton } from "../components/ui/ActionButtons";
import { bg, text, card } from "../components/ui/designTokens";
import { backButton, heading, bodyText } from "../components/ui/typography";
import { ChevronLeftIcon } from "../components/ui/icons";

function OrgDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    upcoming,
    archives,
    loading: loadingEvents,
    error,
  } = useEventsByOrganisateur(org ? org.id : null);

  useEffect(() => {
    fetchOrg();
  }, [id]);

  async function fetchOrg() {
    const { data, error } = await supabase
      .from("organisateurs")
      .select("*")
      .eq("org_id", id)
      .single();
    if (error) console.error(error);
    else setOrg(data);
    setLoading(false);
  }

  if (loading) return <LoadingState fullPage />;
  if (!org) return <LoadingState fullPage text="Organisateur introuvable" />;

  return (
    <div className={"min-h-screen " + bg.page}>
      <div className="sticky top-0 z-40">
        <PageHeader
          back={
            <button onClick={() => navigate(-1)} className={backButton}>
              <ChevronLeftIcon size={18} />
            </button>
          }
          actions={
            <ShareButton
              title={org.nom}
              text={org.nom + " — " + org.type_org}
              url={window.location.origin + "/organisateurs/" + org.org_id}
            />
          }
        />
      </div>

      <div className={"px-3 pt-3 pb-28 flex flex-col gap-4 min-h-screen"}>
        {/* Card organisateur */}
        <div className={card + " overflow-hidden"}>
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge type="typeOrg" value={org.type_org} size="sm" />
              <Badge type="statut" value={org.statut} size="sm" />
            </div>
            <h1 className={heading + " mb-1"}>{org.nom}</h1>
            <p className={"text-xs " + text.muted}>
              {org.ville ? org.ville : ""}
              {org.region ? (org.ville ? " · " : "") + org.region : ""}
            </p>
            {org.description && (
              <p className={bodyText + " mt-3"}>{org.description}</p>
            )}
          </div>

          <div className="px-4 py-3">
            <ContactBlock
              mail={org.mail}
              tel={org.tel}
              lien={org.lien}
              instagram={org.instagram}
            />
          </div>
        </div>

        {loadingEvents && <LoadingState text="Chargement des événements..." />}
        {!loadingEvents && error && <EmptyState error={error} />}

        {/* Prochains événements */}
        {!loadingEvents && !error && (
          <div className="mt-6">
            <SectionTitle
              title="Prochains événements"
              count={upcoming.length}
              countVariant="teal"
            />
            {upcoming.length === 0 ? (
              <p className={"text-sm text-center py-4 " + text.muted}>
                Aucun événement à venir
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {upcoming.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onClick={(id) => navigate("/events/" + id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Archives */}
        {!loadingEvents && !error && archives.length > 0 && (
          <div className="mt-6">
            <SectionTitle
              title="Archives"
              count={archives.length}
              countVariant="gray"
            />
            <div className="flex flex-col gap-4 opacity-60">
              {archives.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  onClick={(id) => navigate("/events/" + id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrgDetail;
