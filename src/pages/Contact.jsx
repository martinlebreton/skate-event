import PageHeader from "../components/ui/PageHeader";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <PageHeader
        title="SKATE"
        accent="EVENT"
        subtitle="Les événements skate en France"
      />

      <main className="px-3 pt-8 pb-28 bg-hatch min-h-screen flex flex-col items-center justify-start">
        <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-8 flex flex-col items-center text-center gap-6">
          {/* Logo */}
          <img
            src="/logo-skateevent.svg"
            alt="SkateEvent"
            className="w-20 h-20 rounded-2xl"
          />

          {/* Texte CTA */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold tracking-tight text-gray-950 dark:text-slate-100">
              Vous organisez un événement skate ?
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Faites connaître votre événement à toute la communauté skate en
              France.
            </p>
          </div>

          {/* Email affiché sans lien */}
          <div className="w-full bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 py-3 px-4">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wide font-medium">
              Contactez Skate Event
            </p>
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
              contact.skateevent@gmail.com
            </p>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            Nous vous répondrons dès que possible, là on skate !
          </p>
        </div>
      </main>
    </div>
  );
}

export default Contact;
