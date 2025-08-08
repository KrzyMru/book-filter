import React from "react";
import NewestWorks from "./components/dashboard-categories/newest-works";
import TrendingReads from "./components/dashboard-categories/trending-reads";
import MostWidelyRead from "./components/dashboard-categories/most-widely-read";
import RandomDaily from "./components/dashboard-categories/random-daily";
import Image from "next/image";

const Page = async () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto pb-3 px-5 gap-5">
      <div className="flex flex-col items-center relative p-10 mask-t-from-90% mask-b-from-80% mask-x-from-80% mask-radial-from-80% bg-cover bg-no-repeat bg-[url(/dashboard-logo-background.jpg)]">
        <div className="relative aspect-[2/3] w-[200px] xs:w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] h-[133px] xs:h-[166px] sm:h-[200px] md:h-[233px] lg:h-[267px] xl:h-[300px]">
          <Image 
            src="/dashboard-logo.jpg"
            alt="Dashboard logo"
            fill
            className="select-none mask-x-from-80% mask-t-from-70% mask-b-from-90%"
          />
        </div>
        <div className="px-6 md:px-8 py-1 mask-x-from-90% bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700">
          <p className="text-sm text-center text-gray-800 font-serif text-white select-none sm:text-base md:text-lg lg:text-xl">Discover New Books</p>
        </div>
      </div>
      <NewestWorks />
      <TrendingReads />
      <MostWidelyRead />
      <RandomDaily />
      <footer>
        <p className="text-xs">Top logo designed by vectorjuice / Freepik</p>
      </footer>
    </div>
  );
}

export default Page;
