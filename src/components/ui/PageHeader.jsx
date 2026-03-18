function TitleBlock({ title, accent, subtitle }) {
  return (
    <>
      <h1 className="text-xl font-bold tracking-tight uppercase text-gray-950 dark:text-slate-100 leading-none">
        {title}
        {accent && (
          <span className="text-teal-600 dark:text-teal-400">{accent}</span>
        )}
      </h1>
      {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
    </>
  );
}

function PageHeader({ title, accent, subtitle, left, right, back, actions }) {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 pt-4 pb-4">
      <div className="flex items-center gap-3">
        {/* Gauche — retour ou logo */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {back && <div className="shrink-0">{back}</div>}
          {left && !back && <div className="shrink-0">{left}</div>}
          {(title || subtitle) && (
            <div className="min-w-0">
              <TitleBlock title={title} accent={accent} subtitle={subtitle} />
            </div>
          )}
        </div>

        {/* Droite — dark mode, admin, actions */}
        <div className="flex items-center gap-2 shrink-0">
          {right && right}
          {actions && actions}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
