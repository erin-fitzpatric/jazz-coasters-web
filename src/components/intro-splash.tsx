'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const SPLASH_SEEN_KEY = 'jazz_coasters_intro_seen';

type SplashStatus = 'checking' | 'show' | 'hide' | 'done';

export function IntroSplash() {
  const [status, setStatus] = useState<SplashStatus>('checking');

  useEffect(() => {
    const seen = window.sessionStorage.getItem(SPLASH_SEEN_KEY) === '1';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nextStatus: SplashStatus = seen || reducedMotion ? 'done' : 'show';
    const startTimer = window.setTimeout(() => {
      setStatus(nextStatus);
    }, 0);

    let hideTimer: number | undefined;
    let doneTimer: number | undefined;

    if (nextStatus === 'show') {
      hideTimer = window.setTimeout(() => {
        setStatus('hide');
      }, 2700);

      doneTimer = window.setTimeout(() => {
        window.sessionStorage.setItem(SPLASH_SEEN_KEY, '1');
        setStatus('done');
      }, 3500);
    }

    return () => {
      window.clearTimeout(startTimer);
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
      if (doneTimer) {
        window.clearTimeout(doneTimer);
      }
    };
  }, []);

  if (status === 'done') {
    return null;
  }

  return (
    <div
      className={`intro-splash ${status === 'checking' ? 'intro-splash--checking' : ''} ${status === 'hide' ? 'intro-splash--hide' : ''}`}
      aria-hidden="true"
    >
      <div className="intro-splash__halo" />
      {status !== 'checking' ? (
        <>
          <Image
            src="/images/the-jazz-coasters-logo-gold-straight.jpg"
            alt=""
            width={1600}
            height={461}
            className="intro-splash__logo"
            priority
            sizes="100vw"
          />
          <p className="intro-splash__title">The Dance Floor Awaits</p>
        </>
      ) : null}
    </div>
  );
}

