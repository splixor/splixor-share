"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SubscriptionButtons from "@/components/subscription";

export default function Home() {
  const floatingLogos = [
    { name: "Freepik", src: "/logos/freepik.png" },
    { name: "Netflix", src: "/logos/netflix.png" },
    { name: "Spotify", src: "/logos/spotify.png" },
    { name: "Canva", src: "/logos/canva.png" },
    { name: "Prime", src: "/logos/prime.png" },
    { name: "Subb", src: "/logos/subb.png" },
  ];

  // Create enough duplicates to ensure seamless loop
  const createLoopingArray = (
    array: { name: string; src: string }[],
    multiplier = 4
  ) => {
    return Array(multiplier).fill(array).flat();
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Row 1 - Moving right */}
        <motion.div
          className="absolute flex gap-10 opacity-20"
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          style={{ x: "-50%" }}
        >
          {createLoopingArray(floatingLogos, 6).map((logo, i) => (
            <div key={i} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={logo.name}
                width={250}
                height={150}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 2 - Moving left */}
        <motion.div
          className="absolute top-80 flex gap-10 opacity-20"
          animate={{
            x: ["-50%", 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          style={{ x: 0 }}
        >
          {createLoopingArray(floatingLogos.slice().reverse(), 6).map(
            (logo, i) => (
              <div key={i} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={250}
                  height={150}
                  className="object-contain"
                />
              </div>
            )
          )}
        </motion.div>

        {/* Row 3 - Moving right slower */}
        {/* <motion.div
          className="absolute bottom-40 flex gap-20 opacity-10"
          animate={{
            x: [0, "-50%"]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          style={{ x: "-50%" }}
        >
          {createLoopingArray(floatingLogos, 6).map((logo, i) => (
            <div key={i} className="flex-shrink-0">
               <Image 
                src={logo.src} 
                alt={logo.name} 
                width={200} 
                height={300}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div> */}

        {/* Row 4 - Moving left faster */}
        {/* <motion.div
          className="absolute bottom-20 flex gap-20 opacity-25"
          animate={{
            x: ["-50%", 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          style={{ x: 0 }}
        >
          {createLoopingArray(floatingLogos.slice().reverse(), 6).map((logo, i) => (
            <div key={i} className="flex-shrink-0">
              <Image 
                src={logo.src} 
                alt={logo.name} 
                width={200} 
                height={300}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div> */}
      </div>

      {/* main content div */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="md:w-[535px] text-center px-4 py-8 bg-[#0B0B0F] border border-[#2A2A33] rounded-2xl">
          {/* Logo */}
          <div className="mb-8">
            <div>
              <Image
                src="/splixor.png"
                alt="Splixor Logo"
                width={40}
                height={40}
                className="mx-auto mb-4"
              />
            </div>
            <h1 className="text-xl md:text-4xl font-semibold text-[#E8EAED] mb-4 font-family-clash-display">
              Splixor
            </h1>
            <p className="text-[#A6A6B0] text-sm lg:text-base max-w-[447px] mx-auto font-family-general-sans font-medium">
              We&apos;re cooking up a smarter way to split and share <br />
              your favorite subscriptions.
            </p>
          </div>

          {/* Main Section */}
          <div className="">
            <h2 className="text-[#22C55E] text-xl md:text-2xl font-medium font-family-clash-display mb-2">
              While you wait, tell us 👇
            </h2>
            <p className="text-[#A6A6B0] text-sm md:text-base font-family-general-sans font-medium">
              Which subscription do you use the most?
            </p>

            {/* Subscription Buttons */}
           <SubscriptionButtons />
          </div>
        </div>

          {/* Community Picks Section */}
          <div className="mt-16 bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-white text-2xl font-semibold mb-8">Community Picks</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
             
            </div>
          </div>
      </section>
    </main>
  );
}
