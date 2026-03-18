import PageHeader from "../components/ui/PageHeader";
import { bg, text } from "../components/ui/designTokens";
import { bodyText } from "../components/ui/typography";

function Contact() {
  return (
    <div className={"min-h-screen " + bg.page}>
      <PageHeader
        title="SKATE"
        accent="EVENT"
        subtitle="Les événements skate en France"
      />

      <main className="px-3 pt-8 pb-28 min-h-screen flex flex-col items-center justify-start">
        <div
          className={
            "w-full max-w-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-8 flex flex-col items-center text-center gap-6 " +
            bg.surface
          }
        >
          <img
            src="/logo-skateevent.svg"
            alt="SkateEvent"
            className="w-20 h-20 rounded-2xl"
          />

          <div className="space-y-2">
            <h2 className={"text-lg font-bold tracking-tight " + text.title}>
              Vous organisez un événement skate ?
            </h2>
            <p className={bodyText}>
              Faites connaître votre événement à toute la communauté skate en
              France. Contactez-nous pour l'ajouter à l'agenda.
            </p>
          </div>

          <div
            className={
              "w-full rounded-xl border border-gray-200 dark:border-slate-700 py-3 px-4 " +
              bg.page
            }
          >
            <p
              className={
                "text-xs uppercase tracking-wide font-medium mb-1 " + text.muted
              }
            >
              Contact
            </p>
            <p className={"text-sm font-semibold " + text.primary}>
              contact.skateevent@gmail.com
            </p>
          </div>

          <p className={"text-xs leading-relaxed " + text.muted}>
            Nous vous répondrons dès que possible, là on skate 🛹
          </p>
        </div>
      </main>
    </div>
  );
}

export default Contact;
