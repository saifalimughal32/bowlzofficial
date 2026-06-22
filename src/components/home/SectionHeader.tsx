import Link from "next/link";

type Props = {
  title: string;
};

export function SectionHeader({ title }: Props) {
  return (
    <div className="section-header">
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
