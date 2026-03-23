function LoadingState({ text = "Chargement...", fullPage = false }) {
  if (fullPage)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-sm text-slate-400 dark:text-slate-600">{text}</p>
      </div>
    );

  return (
    <p className="text-center text-sm text-slate-400 dark:text-slate-600 mt-16">
      {text}
    </p>
  );
}

export default LoadingState;
