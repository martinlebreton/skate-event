import InfoRow from "./InfoRow";

function ContactBlock({ mail, tel, lien, instagram }) {
  if (!mail && !tel && !lien && !instagram) return null;

  const InstagramIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );

  return (
    <div className="flex flex-col gap-2.5">
      <InfoRow icon="✉️" value={mail} truncate />
      <InfoRow icon="📞" value={tel} />
      <InfoRow icon="🔗" value={lien} truncate />
      <InfoRow icon={<InstagramIcon />} value={instagram} />
    </div>
  );
}

export default ContactBlock;
