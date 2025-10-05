import Link from "next/link";

const footerNavigation = {
  product: [
    { name: "Idea Templates", href: "#showcases" },
    { name: "Investor Tools", href: "#investors" },
    { name: "Verification", href: "#trust" },
  ],
  company: [
    { name: "About", href: "#product" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#admin" },
    { name: "Contact", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-brand-700">Nafila Shop</h2>
          <p className="text-sm text-slate-600">
            Building trust between entrepreneurs and investors through curated showcases, due diligence, and community engagement.
          </p>
        </div>
        {Object.entries(footerNavigation).map(([group, links]) => (
          <div key={group}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {group}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="transition hover:text-brand-600">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200/70 bg-slate-100/70 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Nafila Shop. All rights reserved.
      </div>
    </footer>
  );
}
