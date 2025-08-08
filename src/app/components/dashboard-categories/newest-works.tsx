import Link from "next/link";
import WorkSnippet from "../work-snippet";
import { WorkSearchResponse } from "@/app/types";
import { WorkSnippetProps } from "../types";
import SeeMoreSnippet from "../see-more-snippet";

const NewestWorks = async () => {
  let newestWorksResponse: Response;
  try {
    newestWorksResponse = await fetch(`https://openlibrary.org/search.json?q=cover_i:*+AND+ratings_count:[10 TO *]+AND+first_publish_year:[${new Date().getFullYear()-1} TO *]&limit=8&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i&sort=readinglog`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });
  } catch(e: unknown) {
    return;
  }

  const newestWorksSearchResponse: WorkSearchResponse = await newestWorksResponse.json();
  const newestWorks: WorkSnippetProps[] = newestWorksSearchResponse.docs;

  return (
    <div>
      <div className="mb-1">
        <p className="text-2xl text-gray-900">New Releases</p>
        <p className="text-sm text-gray-400">Popular books that released over the last year</p>
      </div>
      <ul className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {newestWorks.map((work) => (
          <li key={work.key} className="max-w-[360px]">
            <WorkSnippet work={work} />
          </li>
        ))}
        <li key="moreNewest">
          <SeeMoreSnippet link={`/search?ratings_min=10&publish_year_min=${new Date().getFullYear()-1}&sort=reading log&page=1`} />
        </li>
      </ul>
    </div>
  );
}

export default NewestWorks;