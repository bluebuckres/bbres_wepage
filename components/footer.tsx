import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Solutions", href: "/solutions/trading-systems" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0F2645] via-[#0A1525] to-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <Image
              src="/logo.png"
              alt="BlueBuck Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-2xl text-white font-['Cormorant_Garamond'] !font-medium">BlueBuck</span>
          </Link>
          <nav className="mt-8">
            <ul className="flex flex-wrap justify-center gap-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-gray-300 hover:text-[#0ea4e9] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 border-t border-[#0ea4e9]/10 pt-8 text-center">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} BlueBuck Research. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}