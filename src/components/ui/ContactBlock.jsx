import InfoRow from "./InfoRow";
import { MailIcon, PhoneIcon, LinkIcon, InstagramIcon } from "./icons";

function ContactBlock({ mail, tel, lien, instagram }) {
  if (!mail && !tel && !lien && !instagram) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <InfoRow icon={<MailIcon />} value={mail} truncate />
      <InfoRow icon={<PhoneIcon />} value={tel} />
      <InfoRow icon={<LinkIcon />} value={lien} truncate href={lien} />
      <InfoRow
        icon={<InstagramIcon />}
        value={instagram}
        href={
          instagram
            ? "https://instagram.com/" + instagram.replace("@", "")
            : null
        }
      />
    </div>
  );
}

export default ContactBlock;
