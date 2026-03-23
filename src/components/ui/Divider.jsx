function Divider({ className = "" }) {
  return (
    <div
      className={"border-t border-gray-100 dark:border-slate-700 " + className}
    />
  );
}

export default Divider;
