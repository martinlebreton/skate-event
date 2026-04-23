import PageHeader from "../components/ui/PageHeader";
import { bg, text } from "../components/ui/designTokens";
import { bodyText } from "../components/ui/typography";

function Contact() {
  return (
    <div className={"min-h-screen " + bg.page}>
      <PageHeader
        title="SKATE"
        accent="EVENT"
        subtitle="L'app des événements skate en France"
      />

      <main className="px-3 pt-8 pb-28 min-h-screen flex flex-col items-center justify-start gap-4">
        {/* Card CTA */}
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
              <a
                href={"mailto:martinlebreton@gmail.com"}
                className="hover:underline"
              >
                martinlebreton@gmail.com
              </a>
            </p>
          </div>

          <p className={"text-xs leading-relaxed " + text.muted}>
            Nous vous répondrons dès la fin de session 🛹
          </p>
        </div>

        {/* Mentions légales */}
        <div
          className={
            "w-full max-w-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6 " +
            bg.surface
          }
        >
          <p className={"text-xs leading-relaxed text-center " + text.muted}>
            SkateEvent est développée par pur plaisir du skate !
          </p>
          <div className="border-t border-gray-100 dark:border-slate-700 my-4" />
          <p className={"text-xs leading-relaxed text-center " + text.muted}>
            Cette application ne peut être tenue responsable des erreurs ou
            inexactitudes dans les contenus des événements et des fiches
            organisateurs. Les informations sont publiées à titre indicatif.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-center ">
            Soutenez le développement de SkateEvent en m'offrant un café !
          </p>

          {/* Bouton Buy me a coffee */}
          <p className="mt-4 ">
            <a
              href={"https://buymeacoffee.com/martinlebreton"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm flex items-center justify-center gap-2.5 py-3 px-6 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                M'offrir un café
              </span>
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Contact;
