import Link from "next/link";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t border-gold-400/25 bg-[#090806]/90 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 text-sm text-stone-300 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} The Jazz Coasters. All rights reserved.</p>
        <p>Serving Cincinnati and beyond with vintage swing, New Orleans jazz, and unforgettable live events.</p>
        <p>
          <Link href="/privacy" className="text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white">
            Privacy Policy
          </Link>
        </p>
        <SocialLinks className="pt-1" />
      </div>
    </footer>
  );
}
