function SectionTitle({ title, count, countVariant = "teal", className = "" }) {
  const countStyles = {
    teal: "bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400",
    gray: "bg-gray-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
  };

  return (
    <h2
      className={
        "text-l font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1 flex items-center gap-2 " +
        className
      }
    >
      {title}
      {count !== undefined && (
        <span
          className={
            "px-2 py-0.5 rounded-full text-l " +
            (countStyles[countVariant] || countStyles.teal)
          }
        >
          {count}
        </span>
      )}
    </h2>
  );
}

export default SectionTitle;
