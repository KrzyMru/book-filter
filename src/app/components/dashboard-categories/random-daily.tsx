import WorkSnippet from "../work-snippet";
import { WorkSearchResponse } from "@/app/types";
import { WorkSnippetProps } from "../types";

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
    <div>
      <div className="mb-1">
        <p className="text-2xl text-gray-900">Today's Picks</p>
        <p className="text-sm text-gray-400">A mix of frequently rated titles, picked just for today</p>
      </div>
      <ul className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {randomWorks.map((work) => (
          <li key={work.key} className="max-w-[360px]">
            <WorkSnippet work={work} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RandomDaily;