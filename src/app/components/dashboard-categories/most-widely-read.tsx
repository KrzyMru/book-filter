import Link from "next/link";
import WorkSnippet from "../work-snippet";
import { WorkSearchResponse } from "@/app/types";
import { WorkSnippetProps } from "../types";
import SeeMoreSnippet from "../see-more-snippet";

const MostWidelyRead = async () => {
  let mostReadWorksResponse: Response;
  try {
    mostReadWorksResponse = await fetch(`https://openlibrary.org/search.json?q=cover_i:*+AND+ratings_count:[50 TO *]&limit=8&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,rating,cover_i&sort=already_read`, {
      method: "GET",
      headers: {
          "Accept": "application/json",
      },
    });
  } catch(e: unknown) {
    return;
  }

  const mostReadWorksSearchResponse: WorkSearchResponse = await mostReadWorksResponse.json();
  const mostReadWorks: WorkSnippetProps[] = mostReadWorksSearchResponse.docs;

  return (
    <div>
      <div className="mb-1">
        <p className="text-2xl text-gray-900">Most Widely Read</p>
        <p className="text-sm text-gray-400">Books read by the most people</p>
      </div>
      <ul className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {mostReadWorks.map((work) => (
          <li key={work.key} className="max-w-[360px]">
            <WorkSnippet work={work} />
          </li>
        ))}
        <li key="moreMostRead">
          <SeeMoreSnippet link={`/search?ratings_min=50&sort=already read&page=1`} />
        </li>
      </ul>
    </div>
  );
}

export default MostWidelyRead;