"use client";

import Image from "next/image";
import { useState } from "react";

type ModalProps = {
  onClose: () => void;
};

// export function NewVoteModal({ onClose }: ModalProps) {
//   const [email, setEmail] = useState("");

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-[#141419] rounded-xl p-6 w-[90%] max-w-md text-center shadow-lg">
//         {/* Top Icon */}
//         <Image
//           src="/confetti.png"
//           alt="Vote Recorded"
//           width={60}
//           height={60}
//           className="mx-auto mb-2"
//         />

//         {/* Title */}
//         <h2 className="text-xl font-family-clash-display font-medium text-white mb-2">
//           Vote Recorded!
//         </h2>

//         {/* Description */}
//         <p className="text-gray-400 font-family-general-sans font-medium text-base mb-6">
//           Thanks for sharing your pick. Every vote helps <br />
//           us build Splixor better.
//         </p>

//         {/* Back to Home */}
//         <button
//           onClick={onClose}
//           className="cursor-pointer mb-4 px-5 py-2 bg-[#2A2A33] border border-[#2A2A33] hover:border-white rounded-full text-white font-family-general-sans font-medium text-sm"
//         >
//           ← Back to Home
//         </button>

//         {/* Notify Me at Launch */}
//         <p className="font-family-clash-display font-medium text-lg text-[#22C55E] mb-3">
//           🔔 Notify Me at Launch
//         </p>

//         {/* Email Input & Submit */}
//         <div className="flex items-center bg-[#0B0B0F] rounded-full px-2 py-1 gap-2">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 px-3 py-2 outline-none text-sm"
//           />
//           <button className="px-4 py-2 bg-[#4F46E5] rounded-full text-white text-sm hover:opacity-90 transition">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


export function NewVoteModal({ onClose, serviceName }: { onClose: () => void; serviceName: string }) {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async () => {
    if (!email) return;
    await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceName, email }),
    });
    onClose();
  };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#141419] rounded-xl p-6 w-[90%] max-w-md text-center shadow-lg">
        {/* Top Icon */}
        <Image
          src="/confetti.png"
          alt="Vote Recorded"
          width={60}
          height={60}
          className="mx-auto mb-2"
        />

        {/* Title */}
        <h2 className="text-xl font-family-clash-display font-medium text-white mb-2">
          Vote Recorded!
        </h2>

        {/* Description */}
        <p className="text-gray-400 font-family-general-sans font-medium text-base mb-6">
          Thanks for sharing your pick. Every vote helps <br />
          us build Splixor better.
        </p>

        {/* Back to Home */}
        <button
          onClick={onClose}
          className="cursor-pointer mb-4 px-5 py-2 bg-[#2A2A33] border border-[#2A2A33] hover:border-white rounded-full text-white font-family-general-sans font-medium text-sm"
        >
          ← Back to Home
        </button>

        {/* Notify Me at Launch */}
        <p className="font-family-clash-display font-medium text-lg text-[#22C55E] mb-3">
          🔔 Notify Me at Launch
        </p>

        {/* Email Input & Submit */}
        <div className="flex items-center bg-[#0B0B0F] rounded-full px-2 py-1 gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 px-3 py-2 outline-none text-sm"
          />
          <button onClick={handleEmailSubmit} className="px-4 py-2 bg-[#4F46E5] rounded-full text-white text-sm hover:opacity-90 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}


export function RecordedVoteModal({ onClose, serviceName }: { onClose: () => void; serviceName: string }) {
  const [email, setEmail] = useState("");

    const handleEmailSubmit = async () => {
    if (!email) return;
    await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceName, email }),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#141419] rounded-xl p-6 w-[90%] max-w-md text-center shadow-lg">
        {/* Top Icon */}
        <Image
          src="/eyeballs.png"
          alt="Vote Recorded"
          width={60}
          height={60}
          className="mx-auto mb-2"
        />

        {/* Title */}
        <h2 className="text-xl font-family-clash-display font-medium text-white mb-2">
          You&apos;ve Voted Already!
        </h2>

        {/* Description */}
        <p className="text-gray-400 font-family-general-sans font-medium text-base mb-6">
          Looks like you&apos;ve had your say. Sit tight, launch <br />
          is around the corner.
        </p>

        {/* Back to Home */}
        <button
          onClick={onClose}
          className="cursor-pointer mb-4 px-5 py-2 bg-[#2A2A33] border border-[#2A2A33] hover:border-white rounded-full text-white font-family-general-sans font-medium text-sm"
        >
          ← Back to Home
        </button>

        {/* Notify Me at Launch */}
        <p className="font-family-clash-display font-medium text-lg text-[#22C55E] mb-3">
          🔔 Notify Me at Launch
        </p>

        {/* Email Input & Submit */}
        <div className="flex items-center bg-[#0B0B0F] rounded-full px-2 py-1 gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 px-3 py-2 outline-none text-sm"
          />
          <button onClick={handleEmailSubmit} className="px-4 py-2 bg-[#4F46E5] rounded-full text-white text-sm hover:opacity-90 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export function OtherVoteModal({ onClose, serviceName }: { onClose: () => void; serviceName: string }) {
  const [email, setEmail] = useState("");

    const handleEmailSubmit = async () => {
    if (!email) return;
    await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceName, email }),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-[#141419] rounded-xl p-6 w-[90%] max-w-md text-center shadow-lg">
        {/* Title */}
        <h2 className="text-xl font-family-clash-display font-medium text-white mb-2">
          Got Another One?
        </h2>

        <button className="absolute top-4 right-3 cursor-pointer" onClick={onClose}>
            <Image
                src="/cancel.png"
                alt="Close"
                width={25}
                height={25}
                className="hover:opacity-70 transition"
            />
        </button>

        {/* Description */}
        <p className="text-gray-400 font-family-general-sans font-medium text-base mb-6">
          Tell us what you share the most and we&apos;ll
          <br /> add it to the list.
        </p>
        <p className="font-family-general-sans font-medium text-lg text-white mb-3">
          Enter subscription name
        </p>
        {/* Email Input & Submit */}
        <div>
          <div className="flex items-center bg-[#0B0B0F] rounded-full px-2 py-1 gap-2">
            <input
              type="email"
              placeholder="Netflix, Spotify..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 px-3 py-2 outline-none text-sm"
            />
          </div>
          <button onClick={handleEmailSubmit} className="cursor-pointer mt-4 w-full px-4 py-3 bg-[#4F46E5] rounded-full text-white text-sm hover:opacity-90 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
