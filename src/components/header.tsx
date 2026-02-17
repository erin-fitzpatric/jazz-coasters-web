'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NAV_ITEMS } from '@/src/lib/constants';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold-400/20 bg-obsidian/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold uppercase tracking-[0.2em] text-gold-300">
          The Jazz Coasters
        </Link>
        <button
          type="button"
          className="rounded border border-gold-300 px-3 py-2 text-sm text-gold-200 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>
        <nav className="hidden gap-5 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-stone-200 hover:text-gold-200">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {isOpen ? (
        <nav className="border-t border-gold-400/20 bg-black/95 px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded px-2 py-2 text-sm font-medium text-stone-100 hover:bg-gold-400/10 hover:text-gold-200"
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
