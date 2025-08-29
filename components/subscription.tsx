"use client";

import { useState, useEffect } from "react";
import { NewVoteModal, OtherVoteModal, RecordedVoteModal } from "./voteModal";
import { generateFingerprint } from "@/lib/fingerprint";

const subscriptionServices = [
  "Netflix",
  "Spotify",
  "YouTube Premium",
  "Freepik",
  "Apple Music",
  "Canva",
  "Others",
];

export default function SubscriptionButtons() {
  const [activeModal, setActiveModal] = useState<
    "new" | "recorded" | "other" | null
  >(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [fingerprint, setFingerprint] = useState<string>("");

  useEffect(() => {
    // Generate fingerprint on client side
    setFingerprint(generateFingerprint());
  }, []);

  const handleClick = async (service: string) => {
    if (service === "Others") {
      setActiveModal("other");
      return;
    }

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          serviceName: service,
          fingerprint: fingerprint 
        }),
      });

      if (res.status === 200) {
        setActiveModal("new");
        // Dispatch event to trigger stats refresh
        window.dispatchEvent(new Event('voteUpdated'));
      } else if (res.status === 409) {
        setActiveModal("recorded");
      } else {
        console.error("Unexpected response", await res.json());
      }
    } catch (err) {
      console.error("Vote error:", err);
    }
    setSelectedService(service);
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {subscriptionServices.map((service) => (
          <button
            key={service}
            onClick={() => handleClick(service)}
            className="cursor-pointer px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 font-family-general-sans font-medium text-sm bg-[#2A2A33] border border-[#2A2A33] text-[#A6A6B0] hover:bg-[#4F46E5] hover:text-white"
          >
            {service}
          </button>
        ))}
      </div>

      {activeModal === "new" && (
        <NewVoteModal
          onClose={() => setActiveModal(null)}
          serviceName={selectedService}
        />
      )}
      {activeModal === "recorded" && (
        <RecordedVoteModal
          onClose={() => setActiveModal(null)}
          serviceName={selectedService}
        />
      )}
      {activeModal === "other" && (
        <OtherVoteModal 
          onClose={() => setActiveModal(null)} 
          serviceName="" 
          fingerprint={fingerprint}
        />
      )}
    </>
  );
}









// "use client";

// import { useState } from "react";
// import { NewVoteModal, OtherVoteModal, RecordedVoteModal } from "./voteModal";

// const subscriptionServices = [
//   "Netflix",
//   "Spotify",
//   "YouTube Premium",
//   "Freepik",
//   "Apple Music",
//   "Canva",
//   "Others",
// ];

// export default function SubscriptionButtons() {
//   const [activeModal, setActiveModal] = useState<
//     "new" | "recorded" | "other" | null
//   >(null);
//   const [selectedService, setSelectedService] = useState<string>("");

//   const handleClick = async (service: string) => {
//     if (service === "Others") {
//       setActiveModal("other");
//       return;
//     }

//     try {
//       const res = await fetch("/api/vote", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ serviceName: service }),
//       });

//       if (res.status === 200) {
//         setActiveModal("new");
//       } else if (res.status === 409) {
//         setActiveModal("recorded");
//       } else {
//         console.error("Unexpected response", await res.json());
//       }
//     } catch (err) {
//       console.error("Vote error:", err);
//     }
//     setSelectedService(service);
//   };

//   return (
//     <>
//       <div className="mt-4 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
//         {subscriptionServices.map((service) => (
//           <button
//             key={service}
//             onClick={() => handleClick(service)}
//             className="cursor-pointer px-6 py-3 h-[48px] rounded-full transition-all duration-200 hover:scale-105 font-family-general-sans font-medium md:text-sm bg-[#2A2A33] border border-[#2A2A33] text-[#A6A6B0] hover:bg-[#4F46E5] hover:text-white"
//           >
//             {service}
//           </button>
//         ))}
//       </div>

//       {activeModal === "new" && (
//         <NewVoteModal
//           onClose={() => setActiveModal(null)}
//           serviceName={selectedService}
//         />
//       )}
//       {activeModal === "recorded" && (
//         <RecordedVoteModal
//           onClose={() => setActiveModal(null)}
//           serviceName={selectedService}
//         />
//       )}
//       {activeModal === "other" && (
//         <OtherVoteModal onClose={() => setActiveModal(null)} serviceName={""} />
//       )}
//     </>
//   );
// }
