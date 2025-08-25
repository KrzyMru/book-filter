import { WorkSnippetProps } from "@/app/components/types";
import { WorkSearchResponse } from "@/app/types";
import Pagination from "./components/pagination";
import { Suspense } from "react";
import { SearchParams } from "./types";
import Loading from "./loading";
import WorkSnippetRectangle from "../components/work-snippet-rectangle";
import translateSort from "./utils/translate-sort";
import translateFilters from "./utils/translate-filters/translate-filters";

// Needed because searchParam change doesn't trigger loading.tsx
const PageWrapper = async ({ searchParams }: { searchParams: Promise<SearchParams>}) => {
    const props = await searchParams;
    const suspenseKey = JSON.stringify(props);

    return (
        <Suspense 
            key={suspenseKey} 
            fallback={<Loading />}
        >
            <Page { ...props }/>
        </Suspense>
    );
}

const Page = async (props: SearchParams) => {
    const { query, author_key, sort, sort_direction, page } = { ...props };

    const parsedQuery = query ? "title:" + query : "";
    let parsedFilters = translateFilters(props);
    if(!parsedQuery) // Skip first '+AND+' if query is empty (causes errors)
        parsedFilters = parsedFilters.slice(5);
    const parsedParams = author_key ? `&author_key=${author_key}` : "";
    const parsedSort = translateSort(sort, sort_direction);
    const parsedPage = Number.isNaN(Number(page)) ? 1 : Number(page);

    const resultsResponse = await fetch(`https://openlibrary.org/search.json?q=${parsedQuery}${parsedFilters}${parsedParams}&sort=${parsedSort}&page=${parsedPage}&limit=10&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i`, {
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
                    <p className="text-2xl text-gray-900">{`Results ${query ? 'for \"'+query+'\"' : ''}`}</p>
                    <p className="text-sm text-gray-400">{`Found ${resultsSearchData.num_found} works matching this query`}</p>
                </div>
                <ul className="grid lg:grid-cols-2 2xl:grid-cols-3">
                    {results.map((work) => (
                        <li key={work.key}>
                            <WorkSnippetRectangle work={work} />
                        </li>
                    ))}
                </ul>
            </div>
            <Pagination 
                { ...props }
                page={parsedPage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default PageWrapper;