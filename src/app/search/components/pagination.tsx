import Link from "next/link"
import { PaginationProps } from "./types";

const Pagination = (props: PaginationProps) => {
    const { query, searchBy, page, totalPages } = { ...props };
    const Page = ({ innerPage } : { innerPage: number }) => {
        return (
            <Link 
                href={`/search?query=${query}&searchBy=${searchBy}&page=${innerPage}`}
                className={`rounded-full py-2 px-4 border-1 border-gray-300 ${innerPage === page ? 'bg-sky-100 pointer-events-none font-bold' : 'bg-gray-50 font-semibold'} hover:bg-gray-100`}
            >
                {innerPage}
            </Link> 
        );
    }
   
    return (
        <nav className="flex gap-1 justify-center items-center sticky bottom-0 bg-stone-200 border-t-2 border-gray-300 p-2">
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
                    <p className="mx-3">...</p>
                    <Page innerPage={totalPages} />
                </>
                :
                page > totalPages - 3 ?
                <> 
                    <Page innerPage={1} />
                    <p className="mx-3">...</p>
                    {Array.from({ length: 4 }, (_, i) => (
                        <Page key={totalPages-(i)} innerPage={totalPages-(i)} />
                    )).reverse()}
                </>
                :
                <>
                    <Page innerPage={1} />
                    <p className="mx-3">...</p>
                    <Page innerPage={page-1} />
                    <Page innerPage={page} />
                    <Page innerPage={page+1} />
                    <p className="mx-3">...</p>
                    <Page innerPage={totalPages} />
                </>

            }
        </nav>
    )
}

export default Pagination;