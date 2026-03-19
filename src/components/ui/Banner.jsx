function Banner({ bg, icon, title, text, onClick, className = "" }) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={
        "flex items-center gap-3 px-4 py-3 mt-3 mb-6 rounded-xl " +
        bg +
        " " +
        (isClickable ? "cursor-pointer active:opacity-90" : "") +
        " " +
        className
      }
    >
      {/* Icône gauche */}
      {icon && (
        <div className="shrink-0 w-10 h-10 flex items-center justify-center">
          {icon}
        </div>
      )}

      {/* Texte */}
      <div className="flex-1 min-w-0">
        {title && <p className="text-md font-semibold leading-snug">{title}</p>}
        {text && (
          <p className="text-sm leading-relaxed mt-0.5 opacity-80">{text}</p>
        )}
      </div>

      {/* Chevron si cliquable */}
      {isClickable && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="shrink-0 opacity-70"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </div>
  );
}

export default Banner;
