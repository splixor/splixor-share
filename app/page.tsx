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

        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="md:w-[535px] text-center px-4 py-8 bg-[#0B0B0F] border border-[#2A2A33] rounded-2xl">
          <div className="mb-8">
            <Image
              src="/splixor.png"
              alt="Splixor Logo"
              width={40}
              height={40}
              className="mx-auto mb-4"
            />
             <h1 className="text-xl md:text-4xl font-semibold text-[#E8EAED] mb-4 font-family-clash-display">
              Splixor
            </h1>
            <p className="text-[#A6A6B0] text-sm lg:text-base max-w-[447px] mx-auto font-family-general-sans font-medium">
              We&apos;re cooking up a smarter way to split and share <br />
              your favorite subscriptions.
            </p>
          </div>

          <div>
             <h2 className="text-[#22C55E] text-xl md:text-2xl font-medium font-family-clash-display mb-2">
              While you wait, tell us 👇
            </h2>
            <p className="text-[#A6A6B0] text-sm md:text-base font-family-general-sans font-medium">
              Which subscription do you use the most?
            </p>
            <SubscriptionButtons />
          </div>
        </div>
        <CommunityPicks />
      </section>
    </main>
  );
}

