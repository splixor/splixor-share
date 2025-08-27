"use client";

import { useState, useEffect } from 'react';

interface VoteStat {
  service: string;
  count: number;
  percentage: number;
}

const serviceColors: { [key: string]: string } = {
  'Netflix': '#E50914',
  'Spotify': '#1DB954',
  'YouTube Premium': '#FF0000',
  'Freepik': '#1273EB',
  'Apple Music': '#FA233B',
  'Canva': '#00C4CC',
  'Others': '#6B7280'
};

export default function CommunityPicks() {
  const [voteStats, setVoteStats] = useState<VoteStat[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  const predefinedServices = [
    'Apple Music', 'Canva', 'Freepik', 'Netflix', 
    'Spotify', 'YouTube Premium', 'Others'
  ];

  useEffect(() => {
    fetchVoteStats();
  }, []);

  const fetchVoteStats = async () => {
    try {
      const response = await fetch('/api/vote');
      const data = await response.json();
      
      if (response.ok) {
        // Ensure all predefined services are included even with 0 votes
        const completeStats = predefinedServices.map(service => {
          const existingStat = data.voteStats.find((stat: VoteStat) => stat.service === service);
          return existingStat || { service, count: 0, percentage: 0 };
        });

        setVoteStats(completeStats);
        setTotalVotes(data.totalVotes);
      }
    } catch (error) {
      console.error('Failed to fetch vote stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-4 py-6 px-6 bg-[#141419] rounded-2xl md:w-[535px] w-full">
        <h3 className="text-white text-base md:text-lg font-medium font-family-clash-display mb-4">
          Community Picks
        </h3>
        <div className="text-center text-gray-400">Loading results...</div>
      </div>
    );
  }

  return (
    <div className="mt-4 py-6 px-6 bg-[#141419] rounded-2xl md:w-[535px] w-full">
      <h3 className="text-white text-base md:text-lg font-medium font-family-clash-display mb-6">
        Community Picks
      </h3>

      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {voteStats.map((stat) => {
          const color = serviceColors[stat.service] || '#6B7280';
          const heightPercentage = totalVotes > 0 ? Math.max((stat.percentage / 100) * 100, 5) : 5;
          
          return (
            <div key={stat.service} className="flex flex-col items-center">
              {/* Progress Bar */}
              <div className="w-6 h-16 bg-gray-800 rounded-lg overflow-hidden mb-2 flex flex-col-reverse">
                <div 
                  className="transition-all duration-500 ease-out rounded-t-lg"
                  style={{ 
                    backgroundColor: color,
                    height: `${heightPercentage}%`,
                    minHeight: stat.count > 0 ? '8px' : '0px'
                  }}
                />
              </div>
              
              {/* Percentage */}
              <div className="text-[#FF841F] font-medium font-family-general-sans text-sm mb-1">
                {stat.percentage}%
              </div>
              
              {/* Service Name */}
              <span className="text-[#A6A6B0] text-xs font-family-general-sans font-medium text-center leading-tight">
                {stat.service === 'YouTube Premium' ? 'Youtube Premium' : stat.service}
              </span>
            </div>
          );
        })}
      </div>

      {totalVotes > 0 && (
        <div className="mt-4 text-center text-gray-400 text-sm font-family-general-sans">
          {totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}
        </div>
      )}
    </div>
  );
}



// export default function CommunityPicks() {
//   return (
//     <div className="mt-4 py-2 px-6 bg-[#141419] rounded-2xl md:w-[535px] w-full">
//       <h3 className="text-white text-base md:text-lg font-medium font-family-clash-display mb-4">
//         Community Picks
//       </h3>

//       <div className="font-family-general-sans font-medium text-center grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-4">
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
//           <span className="text-[#A6A6B0] text-xs">Apple Music</span>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
//           <span className="text-[#A6A6B0] text-xs">Canva</span>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
//           <span className="text-[#A6A6B0] text-xs">Freepik</span>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
//           <span className="text-[#A6A6B0] text-xs">Netflix</span>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
//           <span className="text-[#A6A6B0] text-xs">Spotify</span>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
//           <span className="text-[#A6A6B0] text-xs">Youtube Premium</span>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
//           <span className="text-[#A6A6B0] text-xs">Others</span>
//         </div>
//       </div>
//     </div>
//   );
// }
