import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
};

export function SectionHeader({ title, className }: Props) {
  return (
    <div className={cn("section-header", className)}>
      <h2 className="section-label">{title}</h2>
    </div>
  );
}

export function SectionFooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");

  return (
    <div className="mt-10 flex justify-center md:mt-14">
      {isExternal ? (
        <a href={href} className="btn-pill btn-pill-outline" target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link href={href} className="btn-pill btn-pill-outline">
          {label}
        </Link>
      )}
    </div>
  );
}
