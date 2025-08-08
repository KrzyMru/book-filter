import { WorkSnippetProps } from "@/app/components/types";
import { WorkSearchResponse } from "@/app/types";
import Pagination from "./components/pagination";
import { Suspense } from "react";
import { FilterRanges, SearchParams } from "./types";
import Loading from "./loading";
import WorkSnippetRectangle from "../components/work-snippet-rectangle";
import TranslateSortType from "./utils/translate-sort-type";

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
    const { 
        query, author, cover, author_name, subjects, person, place, 
        author_key, ratings_min, ratings_max, pages_min, pages_max,
        publish_year_min, publish_year_max, sort, sort_direction, page 
    } = { ...props };

    const parsedQuery = query ? "title:" + query : "";

    const parsedAuthor = author === "false" ? "+AND+NOT+author_key:*" : 
        author === "true" ? "+AND+author_key:*"
        : "";
    const parsedCover = cover === "false" ? "+AND+NOT+cover_i:*" : 
        cover === "true" ? "+AND+cover_i:*" 
        : "";
    
    const parsedAuthorName = author_name ? `+AND+author:${author_name}` : "";
    const parsedSubjects = subjects ? "+AND+"+subjects.split(',').map(s => `subject:${s.replaceAll(' ', '+')}`).filter(Boolean).join('+') : "";
    const parsedPerson = person ? `+AND+person:${person}` : "";
    const parsedPlace = place ? `+AND+place:${place}` : "";

    const parsedRatingsMin = !ratings_min || Number.isNaN(Number(ratings_min)) || Number(ratings_min) < FilterRanges.MIN_RATINGS ? "*" : ratings_min;
    const parsedRatingsMax = !ratings_max || Number.isNaN(Number(ratings_max)) || Number(ratings_max) > FilterRanges.MAX_RATINGS ? "*" : ratings_max;
    const parsedRatingRange = (ratings_min || ratings_max) ? `+AND+ratings_count:[${parsedRatingsMin}+TO+${parsedRatingsMax}]` : "";

    const parsedPagesMin = !pages_min || Number.isNaN(Number(pages_min)) || Number(pages_min) < FilterRanges.MIN_PAGES ? "*" : pages_min;
    const parsedPagesMax = !pages_max || Number.isNaN(Number(pages_max)) || Number(pages_max) > FilterRanges.MAX_PAGES ? "*" : pages_max;
    const parsedPageRange = (pages_min || pages_max) ? `+AND+number_of_pages:[${parsedPagesMin}+TO+${parsedPagesMax}]` : "";

    const parsedPublishYearMin = !publish_year_min || Number.isNaN(Number(publish_year_min)) || Number(publish_year_min) < FilterRanges.MIN_PUBLISH_YEAR ? "*" : publish_year_min;
    const parsedPublishYearMax = !publish_year_max || Number.isNaN(Number(publish_year_max)) || Number(publish_year_max) > FilterRanges.MAX_PUBLISH_YEAR ? "*" : publish_year_max;
    const parsedPublishYearRange = (publish_year_min || publish_year_max) ? `+AND+first_publish_year:[${parsedPublishYearMin}+TO+${parsedPublishYearMax}]` : "";

    const textFilterContent = parsedAuthorName+parsedSubjects+parsedPerson+parsedPlace;
    const buttonfilterContent = parsedAuthor+parsedCover;  
    const rangeFilterContent = parsedRatingRange+parsedPageRange+parsedPublishYearRange;

    const filterString = buttonfilterContent+textFilterContent+rangeFilterContent;
    const parsedFilters = !parsedQuery && filterString ? filterString.slice(5) : filterString; // Skip first +AND+ if query is empty (causes errors)

    const parsedAuthorKey = author_key ? `&author_key=${author_key}` : "";
    const parsedSort = sort ? TranslateSortType(sort, sort_direction) : ""; // "" is relevance sort
    const parsedPage = Number.isNaN(Number(page)) ? 1 : Number(page);

    const resultsResponse = await fetch(`https://openlibrary.org/search.json?q=${parsedQuery}${parsedFilters}${parsedAuthorKey}&sort=${parsedSort}&page=${parsedPage}&limit=10&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i`, {
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
                    <p className="text-2xl text-gray-900">{`Results ${query && query !== "*" ? 'for \"'+query+'\"' : ''}`}</p>
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