import React from "react";
import NewestWorks from "./components/dashboard-categories/newest-works";
import TrendingReads from "./components/dashboard-categories/trending-reads";
import MostWidelyRead from "./components/dashboard-categories/most-widely-read";
import RandomDaily from "./components/dashboard-categories/random-daily";

const Page = async () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto py-3 px-5 gap-5">
      <NewestWorks />
      <TrendingReads />
      <MostWidelyRead />
      <RandomDaily />
    </div>
  );
}

export default Page;
