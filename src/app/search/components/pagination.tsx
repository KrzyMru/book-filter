import Link from "next/link"
import { PaginationProps } from "./types";

const Pagination = (props: PaginationProps) => {
    const { query, sort, sort_direction, page, totalPages, ...filters } = { ...props };
    
    const parsedQuery = query ?? "";
    const filterString = Object.entries(filters)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const parsedFilters = filterString ? '&'+filterString : "";
    const parsedSort = sort ? `&sort=${sort}` : "";
    const parsedSortDirection = sort_direction ? `&sort_direction=${sort_direction}` : "";

    const Page = ({ innerPage } : { innerPage: number }) => {
        return (
            <Link 
                href={`/search?query=${parsedQuery}${parsedFilters}${parsedSort}${parsedSortDirection}&page=${innerPage}`}
                className={`rounded-full border-1 border-gray-300 py-2 px-4 ${innerPage === page ? 'bg-sky-100 pointer-events-none font-bold' : 'bg-gray-50 font-semibold'} hover:bg-sky-50 focus:outline-3`}
            >
                {innerPage}
            </Link> 
        );
    }
   
    return (
        <nav className="flex gap-1 justify-center items-center sticky bottom-0 bg-stone-100 border-t-2 border-gray-300 p-2">
            {
                totalPages < 8 ?
                Array.from({ length: totalPages }, (_, i) => (
                    <Page key={i+1} innerPage={i+1} />
                ))
                :
                page < 4 ?
                <> 
                    {Array.from({ length: 4 }, (_, i) => (
                        <Page key={i+1} innerPage={i+1} />
                    ))}
                    <p className="mx-3 select-none">...</p>
                    <Page innerPage={totalPages} />
                </>
                :
                page > totalPages - 3 ?
                <> 
                    <Page innerPage={1} />
                    <p className="mx-3 select-none">...</p>
                    {Array.from({ length: 4 }, (_, i) => (
                        <Page key={totalPages-(i)} innerPage={totalPages-(i)} />
                    )).reverse()}
                </>
                :
                <>
                    <Page innerPage={1} />
                    <p className="mx-3 select-none">...</p>
                    <Page innerPage={page-1} />
                    <Page innerPage={page} />
                    <Page innerPage={page+1} />
                    <p className="mx-3 select-none">...</p>
                    <Page innerPage={totalPages} />
                </>

            }
        </nav>
    )
}

export default Pagination;