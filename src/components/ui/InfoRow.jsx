function InfoRow({ icon, value, truncate = false }) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-2.5 text-sm text-teal-600 dark:text-teal-400">
      <span className="shrink-0">{icon}</span>
      <span className={truncate ? "truncate" : ""}>{value}</span>
    </div>
  );
}

export default InfoRow;
