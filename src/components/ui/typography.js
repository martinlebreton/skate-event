import { text, bg } from "./designTokens";

export const pageTitle =
  "text-xl font-bold tracking-tight uppercase " + text.title;
export const heading = "text-lg font-bold tracking-tight " + text.title;
export const subheading = "text-[15px] font-semibold " + text.title;
export const cardTitle =
  "text-4xl font-bold tracking-tight " +
  text.title +
  " leading-tight text-balance";
export const bodyText = "text-[15px] " + text.body + " leading-relaxed";
export const smallText = "text-[13px] " + text.muted;
export const hintText = "text-xs " + text.hint;
export const sectionLabel =
  "text-[13px] font-medium uppercase tracking-wide " + text.muted + " mb-1";
export const sectionValue = "text-[15px] font-medium " + text.title;
export const sectionText = "text-[15px] " + text.body + " leading-relaxed";
export const pageSubtitle = "text-sm " + text.muted + " mt-0.5";
export const backButton = [
  "flex items-center justify-center",
  "w-9 h-9 rounded-xl",
  bg.subtle,
  text.body,
  "hover:bg-gray-200 dark:hover:bg-slate-600",
  "transition-colors border-none cursor-pointer",
].join(" ");
