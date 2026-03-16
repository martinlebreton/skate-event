function DeleteModal({ item, onConfirm, onCancel }) {
  if (!item) return null;

  const label = item.nom || item.title || "cet élément";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-lg font-bold tracking-tight text-gray-950 dark:text-slate-100 mb-2">
          Supprimer ?
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          <span className="font-medium text-gray-700 dark:text-slate-300">
            "{label}"
          </span>{" "}
          sera définitivement supprimé.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 rounded-xl py-3 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
