import Link from "next/link";
import { footerLinks, footerSocial, siteConfig } from "@/data/content";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { PaymentIcons, SocialIcons } from "@/components/layout/FooterIcons";
import { Logo } from "@/components/brand/Logo";

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        const className = "footer-nav-link";

        return (
          <li key={link.label}>
            {isExternal ? (
              <a href={link.href} className={className} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={className}>
                {link.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="bg-white text-ink">
      <FooterNewsletter />

      <div className="w-full py-12 md:py-16">
        <div className="mb-10 px-4 md:px-5">
          <Logo variant="dark" />
        </div>
        <div className="grid gap-10 px-4 sm:grid-cols-2 md:px-5 lg:grid-cols-4 lg:gap-8">
          <FooterLinkList links={footerLinks.shop} />
          <FooterLinkList links={footerLinks.learn} />
          <FooterLinkList links={footerLinks.support} />

          <div>
            <h3 className="footer-nav-link mb-4">Contact</h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mb-5 block text-sm text-muted transition-colors hover:text-ink"
            >
              {siteConfig.email}
            </a>
            <SocialIcons links={footerSocial} />
          </div>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="flex w-full flex-col gap-6 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-5">
          <PaymentIcons />

          <p className="text-xs text-muted md:text-sm">
            © {new Date().getFullYear()}, {siteConfig.name.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
