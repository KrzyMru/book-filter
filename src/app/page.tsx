import React from "react";
import { WorkTitleSearchResponse } from "./types";
import { WorkSnippetProps } from "./components/types";
import WorkSnippet from "./components/work-snippet";

const Page = async () => {
  const newestWorksResponse = await fetch(`https://openlibrary.org/search.json?q=*&limit=10&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i&first_publish_year=${new Date().getFullYear()}&sort=rating`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
    },
  });
  const trendingWorksResponse = await fetch(`https://openlibrary.org/search.json?q=*&limit=10&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i&sort=currently_reading`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
    },
  });
  const mostReadWorksResponse = await fetch(`https://openlibrary.org/search.json?q=*&limit=10&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,rating,cover_i&sort=already_read`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
    },
  });
  const mostAnticipatedWorksResponse = await fetch("https://openlibrary.org/search.json?q=*&limit=10&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i&sort=want_to_read", {
    method: "GET",
    headers: {
        "Accept": "application/json",
    },
  });

  const newestWorksSearchResponse: WorkTitleSearchResponse = await newestWorksResponse.json();
  const newestWorks: WorkSnippetProps[] = newestWorksSearchResponse.docs;
  const trendingWorksSearchResponse: WorkTitleSearchResponse = await trendingWorksResponse.json();
  const trendingWorks: WorkSnippetProps[] = trendingWorksSearchResponse.docs;
  const mostReadWorksSearchResponse: WorkTitleSearchResponse = await mostReadWorksResponse.json();
  const mostReadWorks: WorkSnippetProps[] = mostReadWorksSearchResponse.docs;
  const mostAnticipatedWorksSearchResponse: WorkTitleSearchResponse = await mostAnticipatedWorksResponse.json();
  const mostAnticipatedWorks: WorkSnippetProps[] = mostAnticipatedWorksSearchResponse.docs;

  return (
    <div className="flex flex-col">
      
      <div className="mt-3 mx-5 mb-5">
        <div className="mb-1">
          <p className="text-2xl text-gray-900">New releases</p>
          <p className="text-sm text-gray-400">Popular books that released this year</p>
        </div>
        <ul className="flex gap-2 overflow-x-auto">
          {newestWorks.map((work) => (
            <li key={work.key}>
              <WorkSnippet work={work} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 mx-5 mb-5">
        <div className="mb-1">
          <p className="text-2xl text-gray-900">Trending reads</p>
          <p className="text-sm text-gray-400">Books that the most people are reading right now</p>
        </div>
        <ul className="flex gap-2 overflow-x-auto">
          {trendingWorks.map((work) => (
            <li key={work.key}>
              <WorkSnippet work={work} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 mx-5 mb-5">
        <div className="mb-1">
          <p className="text-2xl text-gray-900">Most Widely Read</p>
          <p className="text-sm text-gray-400">Books that the most people have read</p>
        </div>
        <ul className="flex gap-2 overflow-x-auto">
          {mostReadWorks.map((work) => (
            <li key={work.key}>
              <WorkSnippet work={work} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 mx-5 mb-5">
        <div className="mb-1">
          <p className="text-2xl text-gray-900">Most anticipated</p>
          <p className="text-sm text-gray-400">Books that the most people want to read</p>
        </div>
        <ul className="flex gap-2 overflow-x-auto">
          {mostAnticipatedWorks.map((work) => (
            <li key={work.key}>
              <WorkSnippet work={work} />
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}

export default Page;
