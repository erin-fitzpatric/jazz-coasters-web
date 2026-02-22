import React from 'react';

const socialLinks = [
  {
    href: 'https://www.facebook.com/jazzcoasters/',
    label: 'Facebook',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M13.5 21v-8.4h2.8l.4-3.3h-3.2V7.2c0-1 .3-1.7 1.8-1.7h1.9V2.6c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.7-4.5 4.7v2.1H7.2v3.3H10V21h3.5z" />
      </svg>
    )
  },
  {
    href: 'https://www.instagram.com/thejazzcoasters/',
    label: 'Instagram',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M7.6 2h8.8C19.5 2 22 4.5 22 7.6v8.8c0 3.1-2.5 5.6-5.6 5.6H7.6C4.5 22 2 19.5 2 16.4V7.6C2 4.5 4.5 2 7.6 2zm-.2 2A3.4 3.4 0 0 0 4 7.4v9.2A3.4 3.4 0 0 0 7.4 20h9.2a3.4 3.4 0 0 0 3.4-3.4V7.4A3.4 3.4 0 0 0 16.6 4H7.4zm10.4 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      </svg>
    )
  },
  {
    href: 'https://www.youtube.com/@thejazzcoasters',
    label: 'YouTube',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M21.8 7.2a2.8 2.8 0 0 0-2-2C18 4.7 12 4.7 12 4.7s-6 0-7.8.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.8 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.8.5 7.8.5s6 0 7.8-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .4-4.8 29 29 0 0 0-.4-4.8zM10 15.5V8.5l6 3.5-6 3.5z" />
      </svg>
    )
  }
];

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((socialLink) => (
        <a
          key={socialLink.label}
          href={socialLink.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Follow The Jazz Coasters on ${socialLink.label}`}
          className="text-gold-200 transition hover:text-gold-100"
        >
          {socialLink.icon}
        </a>
      ))}
    </div>
  );
}
