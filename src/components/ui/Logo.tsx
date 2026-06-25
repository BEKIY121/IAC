import Image from "next/image";
import { BRAND } from "@/lib/branding";
import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const iacSizes: Record<LogoSize, { width: number; height: number }> = {
  xs: { width: 80, height: 32 },
  sm: { width: 100, height: 40 },
  md: { width: 130, height: 52 },
  lg: { width: 180, height: 72 },
  xl: { width: 240, height: 96 },
  "2xl": { width: 280, height: 112 },
};

const mintSizes: Record<LogoSize, { width: number; height: number }> = {
  xs: { width: 28, height: 28 },
  sm: { width: 36, height: 36 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 80, height: 80 },
  "2xl": { width: 120, height: 120 },
};

interface LogoProps {
  size?: LogoSize;
  className?: string;
  priority?: boolean;
  onDark?: boolean;
  /** Hint for Next.js srcset — set to the largest rendered width in px */
  sizes?: string;
}

function hasCustomDimensions(className?: string) {
  return Boolean(className?.match(/\b[wh](?:-\[|\-)/));
}

export function IacLogo({
  size = "md",
  className,
  priority,
  onDark,
  sizes,
}: LogoProps) {
  const s = iacSizes[size];
  const shouldPrioritize =
    priority ??
    (size === "md" || size === "lg" || size === "xl" || size === "2xl");
  const customDimensions = hasCustomDimensions(className);

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
        width={BRAND.iacIntrinsic.width}
        height={BRAND.iacIntrinsic.height}
        sizes={sizes ?? `${s.width}px`}
        quality={100}
        className={cn(
          "object-contain",
          !customDimensions && !onDark && "h-auto w-full max-w-none"
        )}
        style={
          customDimensions || onDark
            ? undefined
            : { width: s.width, height: s.height }
        }
        priority={shouldPrioritize}
      />
    </span>
  );
}

export function MintLogo({ size = "sm", className, priority, sizes }: LogoProps) {
  const s = mintSizes[size];
  const customDimensions = hasCustomDimensions(className);

  return (
    <Image
      src={BRAND.mintLogo}
      alt={BRAND.mintLogoAlt}
      width={BRAND.mintIntrinsic.width}
      height={BRAND.mintIntrinsic.height}
      sizes={sizes ?? `${Math.max(s.width, s.height)}px`}
      quality={100}
      className={cn("shrink-0 object-contain", className)}
      style={
        customDimensions ? undefined : { width: s.width, height: s.height }
      }
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
