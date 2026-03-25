function InfoRow({ icon, value, truncate = false, href }) {
  if (!value) return null;

  const content = (
    <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
      <span className="shrink-0">{icon}</span>
      <span className={truncate ? "truncate" : ""}>{value}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-75 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </a>
    );
  }

  return content;
}

export default InfoRow;
