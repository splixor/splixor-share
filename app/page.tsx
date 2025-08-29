"use client";

import Image from "next/image";
import SubscriptionButtons from "@/components/subscription";
import CommunityPicks from "@/components/communityPicks";

export default function Home() {
  const floatingLogos = [
    { name: "Freepik", src: "/logos/freepik.png" },
    { name: "Netflix", src: "/logos/netflix.png" },
    { name: "Spotify", src: "/logos/spotify.png" },
    { name: "Canva", src: "/logos/canva.png" },
    { name: "Prime", src: "/logos/prime.png" },
    { name: "Subb", src: "/logos/subb.png" },
  ];

  return (
    <main className="home-container">
      <div className="absolute inset-0 pointer-events-none">
        <div className="logo-row logo-row-1">
          {floatingLogos.concat(floatingLogos).map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.name}
              width={250}
              height={150}
            />
          ))}
        </div>

        <div className="logo-row logo-row-2">
          {floatingLogos.concat(floatingLogos).map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.name}
              width={250}
              height={150}
            />
          ))}
        </div>

        <div className="logo-row logo-row-3">
          {floatingLogos.concat(floatingLogos).map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.name}
              width={250}
              height={150}
            />
          ))}
        </div>
      </div>

      <section className="content-wrapper">
        <div className="card-container">
          <div className="mb-8">
            <Image
              src="/splixor.png"
              alt="Splixor Logo"
              width={40}
              height={40}
              className="mx-auto mb-4"
            />
            <h1 className="title">Splixor</h1>
            <p className="subtitle">
              We&apos;re cooking up a smarter way to split and share <br />
              your favorite subscriptions.
            </p>
          </div>

          <div>
            <h2 className="highlight-text">While you wait, tell us 👇</h2>
            <p className="subtitle">Which subscription do you use the most?</p>
            <SubscriptionButtons />
          </div>
        </div>
        <CommunityPicks />
      </section>
    </main>
  );
}

