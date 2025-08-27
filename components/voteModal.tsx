"use client";

import Image from "next/image";
import { useState } from "react";


export function NewVoteModal({ onClose, serviceName }: { onClose: () => void; serviceName: string }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error("Failed to submit email:", error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
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
          <button 
            onClick={handleEmailSubmit} 
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#4F46E5] rounded-full text-white text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function RecordedVoteModal({ onClose, serviceName }: { onClose: () => void; serviceName: string }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error("Failed to submit email:", error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
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
          <button 
            onClick={handleEmailSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#4F46E5] rounded-full text-white text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function OtherVoteModal({ 
  onClose, 
  serviceName, 
  fingerprint 
}: { 
  onClose: () => void; 
  serviceName: string;
  fingerprint?: string;
}) {
  const [customService, setCustomService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!customService.trim()) return;
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          serviceName: customService.trim(),
          fingerprint 
        }),
      });

      if (res.status === 200) {
        // Show success feedback or close modal
        onClose();
      } else if (res.status === 409) {
        // User has already voted
        alert("You've already voted!");
        onClose();
      }
    } catch (error) {
      console.error("Failed to submit vote:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        
        {/* Input & Submit */}
        <div>
          <div className="flex items-center bg-[#0B0B0F] rounded-full px-2 py-1 gap-2">
            <input
              type="text"
              placeholder="Netflix, Spotify..."
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 px-3 py-2 outline-none text-sm"
            />
          </div>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !customService.trim()}
            className="cursor-pointer mt-4 w-full px-4 py-3 bg-[#4F46E5] rounded-full text-white text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}