import { WorkSnippetProps } from "@/app/components/types";
import { WorkSearchResponse } from "@/app/types";
import Pagination from "./components/pagination";
import { Suspense } from "react";
import { ParsedSearchParams, SearchParams } from "./types";
import PageSkeleton from "./components/page-skeleton";
import WorkSnippetRectangle from "../components/work-snippet-rectangle";

// Needed because searchParam change doesn't trigger loading.tsx
const PageWrapper = async ({ searchParams }: { searchParams: Promise<SearchParams>}) => {
    const props = await searchParams;
    const { searchBy, query, page } = { ...props };

    const parsedQuery = query ?? "";
    const parsedPage = Number.isNaN(Number(page)) ? 1 : Number(page);
    const parsedSearchBy = searchBy === "text" ? "q" : searchBy;
    const suspenseKey = JSON.stringify(props);

    return (
        <Suspense 
            key={suspenseKey} 
            fallback={<PageSkeleton />}
        >
            <Page 
                query={parsedQuery}
                searchBy={parsedSearchBy}
                page={parsedPage}
            />
        </Suspense>
    );
}

const Page = async (props: ParsedSearchParams) => {
    const { searchBy, query, page } = props;

    const resultsResponse = await fetch(`https://openlibrary.org/search.json?${searchBy}=${query}&page=${page}&limit=10&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const resultsSearchData: WorkSearchResponse = await resultsResponse.json();
    const results: WorkSnippetProps[] = resultsSearchData.docs;

    const totalPages = Math.ceil(resultsSearchData.num_found / 10);

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="px-3 py-3 overflow-y-auto [transition:padding_350ms] xs:px-5">
                <div className="mb-1">
                    <p className="text-2xl text-gray-900">{`Results for \"${query}\"`}</p>
                    <p className="text-sm text-gray-400">{`Found ${resultsSearchData.num_found} works matching this query`}</p>
                </div>
                <ul className="grid gap-[2px] bg-gray-300 lg:grid-cols-2 2xl:grid-cols-3">
                    {results.map((work) => (
                        <li 
                            key={work.key} 
                            className="bg-white"
                        >
                            <WorkSnippetRectangle work={work} />
                        </li>
                    ))}
                </ul>
            </div>
            <Pagination 
                query={query}
                searchBy={searchBy}
                page={page}
                totalPages={totalPages}
            />
        </div>
    );
}

export default PageWrapper;