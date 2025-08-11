import WorkSnippet from "../work-snippet";
import { WorkSearchResponse } from "@/app/types";
import { WorkSnippetProps } from "../types";
import SlideInWrapper from "../animation-wrappers/slide-in-wrapper";

const RandomDaily = async () => {
  let randomWorksResponse: Response;
  try {
    randomWorksResponse = await fetch("https://openlibrary.org/search.json?q=cover_i:*+AND+ratings_count:[50 TO *]&limit=8&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i&sort=random_daily", {
      method: "GET",
      headers: {
          "Accept": "application/json",
      },
    });
  } catch(e: unknown) {
    return;
  }

  const randomWorksSearchResponse: WorkSearchResponse = await randomWorksResponse.json();
  const randomWorks: WorkSnippetProps[] = randomWorksSearchResponse.docs;

  return (
    <div className="relative">
      <div className="absolute w-full h-full animate-fade-in-background hue-rotate-135 mask-y-from-90% mask-x-from-90% mask-radial-from-85% bg-cover bg-no-repeat bg-[url(/aqua-background.jpg)]" />
      <div className="absolute w-full h-full bg-white/40" />
      <SlideInWrapper variant="header" threshold={1}>
        <div className="pt-5 px-3">
          <p className="text-2xl text-gray-900">Today&apos;s Picks</p>
          <p className="text-sm text-gray-500">A mix of frequently rated titles, picked just for today</p>
        </div>
      </SlideInWrapper>
      <ul className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {randomWorks.map((work) => (
          <li key={work.key} className="max-w-[360px]">
            <SlideInWrapper variant="work">
              <WorkSnippet work={work} />
            </SlideInWrapper>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RandomDaily;