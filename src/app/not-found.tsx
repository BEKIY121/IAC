import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-8xl font-bold text-mint-primary/20">404</div>
      <h1 className="mb-3 text-3xl font-bold text-navy">Page Not Found</h1>
      <p className="mb-8 max-w-md text-slate-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button href="/" showArrow>
        Back to Home
      </Button>
    </div>
  );
}
