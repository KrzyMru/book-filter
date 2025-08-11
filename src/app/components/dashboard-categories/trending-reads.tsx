import Link from "next/link";
import WorkSnippet from "../work-snippet";
import { WorkSearchResponse } from "@/app/types";
import { WorkSnippetProps } from "../types";
import SeeMoreSnippet from "../see-more-snippet";
import SlideInWrapper from "../animation-wrappers/slide-in-wrapper";

const TrendingReads = async () => {
  let trendingWorksResponse: Response;
  try {
    trendingWorksResponse = await fetch(`https://openlibrary.org/search.json?q=cover_i:*+AND+ratings_count:[50 TO *]+AND+first_publish_year:[${new Date().getFullYear()-5} TO *]&limit=8&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i&sort=readinglog`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });
  } catch(e: unknown) {
    return;
  }

  const trendingWorksSearchResponse: WorkSearchResponse = await trendingWorksResponse.json();
  const trendingWorks: WorkSnippetProps[] = trendingWorksSearchResponse.docs;

  return (
    <div className="relative">
      <div className="absolute w-full h-full animate-fade-in-background hue-rotate-270 mask-y-from-90% mask-x-from-90% mask-radial-from-85% bg-cover bg-no-repeat bg-[url(/aqua-background.jpg)]" />
      <div className="absolute w-full h-full bg-white/40" />
      <SlideInWrapper variant="header" threshold={1}>
        <div className="pt-5 px-3">
          <p className="text-2xl text-gray-900">Trending Reads</p>
          <p className="text-sm text-gray-500">The books everyone&apos;s reading right now</p>
        </div>
      </SlideInWrapper>
      <ul className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {trendingWorks.map((work) => (
          <li key={work.key} className="max-w-[360px]">
            <SlideInWrapper variant="work">
              <WorkSnippet work={work} />
            </SlideInWrapper>
          </li>
        ))}
        <li key="moreTrending">
          <SlideInWrapper variant="work">
            <SeeMoreSnippet link={`/search?ratings_min=50&publish_year_min=${new Date().getFullYear()-5}&sort=currently reading&page=1`} />
          </SlideInWrapper>
        </li>
      </ul>
    </div>
  );
}

export default TrendingReads;