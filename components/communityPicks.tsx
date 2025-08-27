



export default function CommunityPicks() {
  return (
    <div className="mt-4 py-2 px-6 bg-[#141419] rounded-2xl md:w-[535px] w-full">
      <h3 className="text-white text-base md:text-lg font-medium font-family-clash-display mb-4">
        Community Picks
      </h3>

      <div className="font-family-general-sans font-medium text-center grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
          <span className="text-[#A6A6B0] text-xs">Apple Music</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
          <span className="text-[#A6A6B0] text-xs">Canva</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
          <span className="text-[#A6A6B0] text-xs">Freepik</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
          <span className="text-[#A6A6B0] text-xs">Netflix</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
          <span className="text-[#A6A6B0] text-xs">Spotify</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
          <span className="text-[#A6A6B0] text-xs">Youtube Premium</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-gray-700 rounded-lg"></div>
          <span className="text-[#A6A6B0] text-xs">Others</span>
        </div>
      </div>
    </div>
  );
}
