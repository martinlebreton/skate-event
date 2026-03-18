export function ShareButton({ title, text, url, size = "md" }) {
  function handleShare(e) {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      navigator.clipboard.writeText(url);
    }
  }

  const sizeClass = size === "sm" ? "w-8 h-8" : "w-9 h-9";

  return (
    <button
      onClick={handleShare}
      className={
        "flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors border-none cursor-pointer " +
        sizeClass
      }
      title="Partager"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-slate-500 dark:text-slate-400"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    </button>
  );
}
