"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href: string;
  children: React.ReactNode;
  showArrow?: boolean;
}

const variants = {
  primary:
    "bg-mint-primary text-white hover:bg-mint-primary-dark shadow-lg shadow-mint-primary/25",
  secondary:
    "bg-navy text-white hover:bg-navy-light shadow-lg shadow-navy/20",
  outline:
    "border-2 border-mint-primary text-mint-primary hover:bg-mint-primary hover:text-white",
  ghost: "text-mint-primary hover:bg-mint-primary/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  showArrow = false,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}
