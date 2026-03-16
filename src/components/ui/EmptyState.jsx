function EmptyState({ title = "Aucun résultat", subtitle, icon }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
      {icon && <span className="text-4xl mb-4">{icon}</span>}
      <p className="text-lg font-bold tracking-tight text-gray-200 dark:text-slate-700">
        {title}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-400 dark:text-slate-600 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default EmptyState;
