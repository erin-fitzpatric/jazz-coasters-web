'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_ITEMS } from '@/src/lib/constants';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold-400/25 bg-black/95 backdrop-blur md:static">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 py-2 md:hidden">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-2 pr-2">
            <Image
              src="/icon.png"
              alt="The Jazz Coasters icon"
              width={128}
              height={128}
              className="h-11 w-11 shrink-0 rounded border border-gold-300/60 bg-black/80 object-cover"
              priority
            />
            <span className="font-[var(--font-marcellus)] text-[clamp(1.05rem,5.2vw,1.45rem)] uppercase tracking-[0.05em] text-stone-100 [text-shadow:0_0_4px_rgba(255,255,255,0.68),0_0_14px_rgba(255,215,120,0.28)]">
              The Jazz Coasters
            </span>
          </Link>
          <button
            type="button"
            className="shrink-0 rounded border border-gold-300/80 bg-gold-400/5 p-2 text-gold-200 transition hover:bg-gold-300/10"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            {isOpen ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  d="M6 6L18 18M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden items-center justify-between gap-4 py-0 md:flex">
          <Link href="/" className="group shrink-0">
            <Image
              src="/images/the-jazz-coasters-logo-gold-straight.jpg"
              alt="The Jazz Coasters logo"
              width={1600}
              height={461}
              className="h-48 w-auto object-contain transition duration-200 ease-out group-hover:scale-[1.02] group-hover:brightness-110 [clip-path:inset(10%_0_10%_0)] sm:h-52 md:h-56 lg:h-60"
              priority
              sizes="(max-width: 640px) 320px, (max-width: 768px) 420px, (max-width: 1024px) 520px, 620px"
            />
          </Link>
          <div className="hidden min-w-0 flex-1 md:block">
            <Link
              href="/"
              className="font-[var(--font-marcellus)] text-4xl uppercase tracking-[0.06em] text-stone-100 transition duration-200 hover:text-white [text-shadow:0_0_4px_rgba(255,255,255,0.82),0_0_13px_rgba(255,255,255,0.6),0_0_28px_rgba(255,255,255,0.36),0_0_52px_rgba(255,215,120,0.27)] hover:[text-shadow:0_0_6px_rgba(255,255,255,0.95),0_0_18px_rgba(255,255,255,0.78),0_0_34px_rgba(255,255,255,0.5),0_0_64px_rgba(255,215,120,0.4)] lg:text-6xl"
            >
              The Jazz Coasters
            </Link>
            <nav className="mt-1 flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-[var(--font-marcellus)] text-2xl uppercase tracking-[0.06em] transition duration-150 ${
                    isActive(item.href)
                      ? 'text-white [text-shadow:0_0_10px_rgba(255,255,255,0.65)]'
                      : 'text-gold-300 hover:text-white hover:[text-shadow:0_0_10px_rgba(255,255,255,0.55)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {isOpen ? (
        <nav className="border-t border-gold-400/20 bg-black/95 px-4 py-3 md:hidden">
          <Link
            href="/"
            className="mb-3 block font-[var(--font-marcellus)] text-2xl uppercase tracking-[0.06em] text-stone-100"
            onClick={() => setIsOpen(false)}
          >
            The Jazz Coasters
          </Link>
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded px-2 py-2 text-sm font-medium uppercase tracking-[0.14em] transition duration-150 ${
                    isActive(item.href)
                      ? 'bg-white/10 text-white'
                      : 'text-stone-100 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
