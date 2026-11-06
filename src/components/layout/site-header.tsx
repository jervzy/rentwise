"use client";

import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { navigationLinks } from "@/lib/homepage-content";
import { MOTION_DURATION, MOTION_EASE, MOTION_STAGGER } from "@/lib/motion";

function getMobileItemVariants(shouldReduceMotion: boolean) {
  return {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : MOTION_DURATION.fast,
        ease: MOTION_EASE.entrance,
      },
    },
  } as const;
}

export function SiteHeader() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const sentinel = document.getElementById("page-top");

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-76px 0px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      if (wasOpenRef.current) {
        menuButtonRef.current?.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      mobilePanelRef.current
        ?.querySelector<HTMLAnchorElement>("a[href]")
        ?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !mobilePanelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        mobilePanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const mobileItemVariants = getMobileItemVariants(shouldReduceMotion);

  return (
    <header className="site-header" data-scrolled={scrolled || menuOpen}>
      <div className="site-header-inner">
        <Link className="wordmark-link" href="/" aria-label="Rent Wise home">
          <Wordmark preload />
        </Link>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="#rent-proposal">
          Get a Rent Proposal
        </Link>

        <button
          ref={menuButtonRef}
          className="menu-trigger"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <noscript>
          <a className="mobile-noscript-cta" href="#rent-proposal">
            Get a Rent Proposal
          </a>
        </noscript>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <m.div
            ref={mobilePanelRef}
            id="mobile-navigation"
            className="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: shouldReduceMotion ? 0 : MOTION_DURATION.interface,
                  ease: MOTION_EASE.entrance,
                  when: "beforeChildren",
                  staggerChildren: shouldReduceMotion
                    ? 0
                    : MOTION_STAGGER.compact,
                },
              },
              exit: {
                opacity: 0,
                y: -8,
                transition: {
                  duration: shouldReduceMotion ? 0 : MOTION_DURATION.fast,
                  ease: MOTION_EASE.exit,
                  when: "afterChildren",
                },
              },
            }}
          >
            <nav aria-label="Mobile primary navigation">
              {navigationLinks.map((link) => (
                <m.div key={link.href} variants={mobileItemVariants}>
                  <Link href={link.href} onClick={closeMenu}>
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </nav>
            <m.div variants={mobileItemVariants}>
              <Link
                className="mobile-navigation-cta"
                href="#rent-proposal"
                onClick={closeMenu}
              >
                Get a Rent Proposal
              </Link>
            </m.div>
            <m.p variants={mobileItemVariants}>
              Guaranteed rent and property management for Reading landlords.
            </m.p>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
