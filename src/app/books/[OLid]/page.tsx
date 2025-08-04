import Image from "next/image";
import { Edition } from "./types";
import { AuthorSnippet, AuthorSnippetSearchResponse, WorkSearchResponse } from "@/app/types";
import Link from "next/link";
import WorkSnippet from "@/app/components/work-snippet";

const Page = async ({ params }: { params: Promise<{ OLid: string }>}) => {
    const { OLid } = await params;

    const editionResponse = await fetch(`https://openlibrary.org/books/${OLid}.json`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });

    const edition: Edition = await editionResponse.json();
    const bestCover = edition.covers && edition.covers?.length > 0 ? edition.covers[0] : undefined;

    const authorKeys = edition.authors ? edition.authors.map(author => author.key) : []; 
    const parsedAuthorKeys = authorKeys.length > 0 ? `key:(${authorKeys.join(' OR ')})` : '';
    const authorSnippetsRequest = await fetch(`https://openlibrary.org/search/authors.json?q=${parsedAuthorKeys}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const authorSnippetsSearchResponse: AuthorSnippetSearchResponse = await authorSnippetsRequest.json();
    const authorSnippets: AuthorSnippet[] = authorSnippetsSearchResponse.docs;

    const relatedWorkKeys = edition.works ? edition.works.map(work => work.key) : []; 
    const relatedWorksResponse = await fetch(`https://openlibrary.org/search.json?q=key:(${relatedWorkKeys.join(' OR ')})&limit=10&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const relatedWorksSearchResponse: WorkSearchResponse = await relatedWorksResponse.json();
    const relatedWorks = relatedWorksSearchResponse.docs;

    return (
        <div className="h-full flex flex-col overflow-y-auto py-3 px-3 [transition:padding_350ms] xs:px-8 items-center">
            <div className="relative w-[200px] aspect-[2/3] h-fit">
                <Image 
                    src={
                        bestCover ? 
                        `https://covers.openlibrary.org/b/id/${bestCover}-L.jpg?default=false` :
                        "/fallback-cover.jpg"
                    }
                    alt="Edition cover"
                    fill
                    className="rounded-br-xl rounded-tr-xl shadow-lg"
                />
            </div>
            <p className="text-2xl text-center font-semibold text-gray-900">{edition.title}</p>
            <ul className="flex gap-1 flex-wrap">
                {
                    authorSnippets?.map((author, index) => (
                        <li key={author.key}>
                            <Link
                                href={`/authors/${author.key}`}
                                title={`See more information about ${author.name}`}
                                className="text-lg text-gray-600 hover:underline"
                            >
                                {author.name}
                            </Link>
                            {index !== authorSnippets.length - 1 && ', '}
                        </li>
                    ))
                }
            </ul>
            <div className={`${edition.first_sentence ? 'block' : 'hidden'} mt-5`}>
                <p className="text-base text-center text-gray-900">{edition.first_sentence?.value}</p>
            </div>
            <div className="w-full flex justify-around py-3 gap-3 border-y-1 border-gray-300 mt-5">
                <div className="flex flex-col items-center w-30">
                    <p className="text-sm text-center text-gray-600">{edition.publish_date ?? "??"}</p>
                    <p className="text-sm text-center text-gray-900">publish date</p>
                </div>
                <div className="flex flex-col items-center w-30">
                    <p className="text-sm text-center text-gray-600">{edition.physical_format ?? "??"}</p>
                    <p className="text-sm text-center text-gray-900">physical format</p>
                </div>
                <div className="flex flex-col items-center w-30">
                    <p className="text-sm text-center text-gray-600">{edition.number_of_pages ?? "??"}</p>
                    <p className="text-sm text-center text-gray-900">pages</p>
                </div>
            </div>
            <div className={`${edition.publishers ? 'block' : 'hidden'} w-full mt-6 pb-3 border-b-1 border-gray-300`}>
                <p className="text-base text-gray-600">{edition?.publishers && edition.publishers?.length > 1 ? "Publishers" : "Publisher"}</p>
                <ul className="flex flex-wrap gap-1">
                    {edition.publishers?.map((publisher, index) => (
                        <li key={index}>
                            <p className="inline text-sm text-center whitespace-nowrap text-gray-900">{publisher}</p>
                            {index !== edition.publishers?.length - 1 && ','}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`${edition.identifiers && (edition.identifiers?.goodreads || edition.identifiers?.librarything) ? 'block' : 'hidden'} w-full mt-6 pb-3 border-b-1 border-gray-300`}>
                <p className="text-base text-gray-600">External links</p>
                <div className={`${edition.identifiers?.goodreads ? 'flex flex-col' : 'hidden'}  mt-1`}>
                    <p className="text-sm text-gray-900">Goodreads</p>
                    <Link 
                        href={`https://www.goodreads.com/book/show/${edition.identifiers?.goodreads}`}
                        className="text-xs text-sky-400"
                    >
                        {`https://www.goodreads.com/book/show/${edition.identifiers?.goodreads}`}
                    </Link>
                </div>
                <div className={`${edition.identifiers?.librarything ? 'flex flex-col' : 'hidden'}  mt-1`}>
                    <p className="text-sm text-gray-900">Librarything</p>
                    <Link 
                        href={`https://www.librarything.com/work/${edition.identifiers?.goodreads}`}
                        className="text-xs text-sky-400"
                    >
                        {`https://www.librarything.com/work/${edition.identifiers?.goodreads}`}
                    </Link>
                </div>
            </div>   
            <div className="w-full mt-6">
                <p className="text-base text-gray-600">Related works</p>
                <ul className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
                    {relatedWorks.map((work) => (
                        <li key={work.key} className="max-w-[360px]">
                            <WorkSnippet work={work} />
                        </li>
                    ))}
                </ul>
            </div>    
        </div>
    );
}

export default Page;