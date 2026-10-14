import burstUrl from "../assets/burst-bloat.svg";

export function SectionHeader({
  title,
  subtitle,
  align = "left",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <img src={burstUrl} alt="" aria-hidden className="h-5 w-5 text-lime" style={{ color: "#D6FF2A" }} />
        <h2 className="font-display text-[32px] font-semibold leading-none tracking-[-0.03em] dark:text-white md:text-[44px]">{title}</h2>
      </div>
      {subtitle ? (
        <p className={`mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-500 dark:text-zinc-400 ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
