interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'mx-auto text-center' : 'text-left'} max-w-3xl`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-cyber-400/30 bg-cyber-400/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-cyber-400 animate-blink" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
