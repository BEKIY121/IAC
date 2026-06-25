import Image from "next/image";
import { BRAND } from "@/lib/branding";
import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

const iacSizes: Record<LogoSize, { width: number; height: number }> = {
  xs: { width: 80, height: 32 },
  sm: { width: 100, height: 40 },
  md: { width: 130, height: 52 },
  lg: { width: 180, height: 72 },
  xl: { width: 240, height: 96 },
};

const mintSizes: Record<LogoSize, { width: number; height: number }> = {
  xs: { width: 24, height: 24 },
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 56, height: 56 },
  xl: { width: 80, height: 80 },
};

interface LogoProps {
  size?: LogoSize;
  className?: string;
  priority?: boolean;
  onDark?: boolean;
}

export function IacLogo({ size = "md", className, priority, onDark }: LogoProps) {
  const s = iacSizes[size];
  const shouldPrioritize = priority ?? (size === "md" || size === "lg" || size === "xl");

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        onDark && "rounded-lg bg-white px-2 py-1",
        className
      )}
    >
      <Image
        src={BRAND.iacLogo}
        alt={BRAND.iacLogoAlt}
        width={s.width}
        height={s.height}
        className="object-contain"
        priority={shouldPrioritize}
      />
    </span>
  );
}

export function MintLogo({ size = "sm", className, priority }: LogoProps) {
  const s = mintSizes[size];

  return (
    <Image
      src={BRAND.mintLogo}
      alt={BRAND.mintLogoAlt}
      width={s.width}
      height={s.height}
      className={cn("shrink-0 rounded-full object-contain", className)}
      priority={priority}
    />
  );
}

export function PartnerLogos({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-8", className)}>
      <IacLogo size="lg" />
      <div className="hidden h-12 w-px bg-gray-200 sm:block" />
      <div className="flex flex-col items-center gap-2">
        <MintLogo size="lg" />
        <span className="text-xs font-medium text-slate-muted">Ministry of Innovation & Technology</span>
      </div>
    </div>
  );
}
