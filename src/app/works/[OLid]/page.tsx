import Image from "next/image";
import { EditionSnippetProps, WorkDescriptorProps, WorkEditionSearchResponse } from "./types";
import Link from "next/link";
import EditionSnippet from "./components/edition-snippet";
import ClientRating from "../../components/client-rating";
import Eye from "../../components/assets/eye.svg";
import BookOpen from "../../components/assets/book-open.svg";
import Bookshelf from "../../components/assets/bookshelf.svg";
import ReactMarkdown from "react-markdown";
import { WorkSnippetProps } from "@/app/components/types";
import { AuthorSnippet, AuthorSnippetSearchResponse, WorkSearchResponse } from "@/app/types";

const Page = async ({ params }: { params: Promise<{ OLid: string }>,
}) => {
    const { OLid } = await params;

    // This is needed because all of those endpoints contain different info
    const workSnippetResponse = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(`key:(/works/${OLid})`)}&limit=1&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const workDescriptorResponse = await fetch(`https://openlibrary.org/works/${OLid}.json`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const workEditionsResponse = await fetch(`https://openlibrary.org/works/${OLid}/editions.json`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });

    const workSearchResponse: WorkSearchResponse = await workSnippetResponse.json();
    const workSnippet: WorkSnippetProps = workSearchResponse.docs[0];
    const workDescriptor: WorkDescriptorProps  = await workDescriptorResponse.json();
    const workEditionSearchResponse: WorkEditionSearchResponse = await workEditionsResponse.json();
    const workEditions: EditionSnippetProps[]  = workEditionSearchResponse.entries;

    const authorKeys = workDescriptor.authors ? workDescriptor.authors.map(author => author.author.key) : []; 
    const authorSnippetsRequest = await fetch(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(`key:(${authorKeys.join(' OR ')})`)}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const authorSnippetsSearchResponse: AuthorSnippetSearchResponse = await authorSnippetsRequest.json();
    const authorSnippets: AuthorSnippet[] = authorSnippetsSearchResponse.docs;
    
    return (
        <div className="h-full flex flex-col overflow-y-auto py-3 px-3 [transition:padding_350ms] xs:px-8 md:flex-row md:justify-center">

            <div className="flex flex-col items-center md:max-w-md md:sticky md:top-0 md:h-full md:pr-12">
                <div className="relative w-[200px] aspect-[2/3] h-fit">
                    <Image 
                        src={
                            workSnippet.cover_i ? 
                            `https://covers.openlibrary.org/b/id/${workSnippet.cover_i}-L.jpg?default=false` :
                            "/fallback-cover.jpg"
                        }
                        alt="Edition cover"
                        fill
                        className="rounded-br-xl rounded-tr-xl shadow-lg"
                    />
                </div>
                <p className="text-2xl text-center font-semibold text-gray-900">{workDescriptor.title}</p>
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
                <div className="flex items-center gap-3 mt-2">
                    <ClientRating 
                        className="inline size-[28px]"
                        initialValue={workSnippet.ratings_average ?? 0} 
                    />
                    <p className="text-2xl text-gray-900 font-semibold">{workSnippet.ratings_average ? workSnippet.ratings_average.toFixed(2) : 0}</p>
                </div>
                <div className="mt-1">
                    <p className="text-sm text-gray-600">{`${workSnippet.ratings_count ?? 0} ratings`}</p>
                </div>
            </div>

            <div className="flex flex-col items-center mt-5 md:items-start md:min-w-0 lg:max-w-2xl md:mt-0">
                <div className="prose">
                    <ReactMarkdown>
                        {typeof(workDescriptor.description) === "string" ? workDescriptor.description : workDescriptor.description?.value}
                    </ReactMarkdown>
                </div>
                <div className="w-full mt-6">
                    <p className="text-base text-gray-600">Genres</p>
                    <ul className="flex flex-wrap">
                        {
                            workDescriptor.subjects?.map((subject, index) => (
                                <li key={index}>
                                    <Link
                                        href={`/subjects/${encodeURIComponent(subject)}`}
                                        title={subject}
                                        className="text-base font-semibold whitespace-nowrap text-gray-900 mr-4 underline decoration-2 underline-offset-5 decoration-green-500 hover:decoration-green-300"
                                    >
                                        {subject}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div> 
                <div className="w-full flex justify-around py-3 gap-3 border-y-1 border-gray-300 mt-6">
                    <div className="flex flex-col items-center">
                        <div className="flex gap-2 items-center">
                            <Image 
                                src={Bookshelf}
                                alt="Already read"
                                title="Already read"
                                className="size-[28px]" 
                            />
                            <p className="text-base text-gray-600">{workSnippet.already_read_count}</p>
                        </div>
                        <p className="text-sm text-center text-gray-600">people already read</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-2 items-center">
                            <Image 
                                src={BookOpen}
                                alt="Currently reading"
                                title="Currently reading"
                                className="size-[28px]" 
                            />
                            <p className="text-base text-gray-600">{workSnippet.currently_reading_count}</p>
                        </div>
                        <p className="text-sm text-center text-gray-600">people are currently reading</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-2 items-center">
                            <Image 
                                src={Eye}
                                alt="Want to read"
                                title="Want to read"
                                className="size-[28px]" 
                            />
                            <p className="text-base text-gray-600">{workSnippet.want_to_read_count}</p>
                        </div>
                        <p className="text-sm text-center text-gray-600">people want to read</p>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <p className="text-base text-gray-600">{`About the author${authorSnippets.length > 1 ? 's' : ''}`}</p>
                    <ul className="pb-4 border-b-1 border-gray-300">
                        {
                            authorSnippets.map((author, index) => (
                                <li key={author.key}>
                                    <div className="flex flex-col">
                                        <Link
                                            href={`/authors/${author.key}`}
                                            title={`See more information about ${author.name}`}
                                            className="text-sm text-gray-600 mt-2 w-fit hover:underline"
                                        >
                                            {author.name}
                                        </Link>
                                        {author.birth_date &&
                                            <p className="text-xs text-gray-600 italic">{`${author.death_date ? author.birth_date : 'born '+author.birth_date}${author.death_date ? ' - '+author.death_date : ''}`}</p>
                                        }
                                        <div className="flex items-center gap-1">
                                            <ClientRating 
                                                initialValue={author.ratings_average ?? 0}
                                                className="inline size-[14px] -mt-2" 
                                            />
                                            <p className="text-xs text-gray-900 font-semibold">{author.ratings_average ? author.ratings_average.toFixed(2) : 0}</p>
                                        </div>
                                        <p className="text-xs text-gray-600">{`${author.ratings_count ?? 0} ratings${author.work_count ? ' · '+author.work_count+' works' : ''}`}</p>
                                        {index !== authorSnippets.length - 1 &&
                                            <div className="mt-3 mx-10 border-b-1 border-gray-300" />
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-full mt-4">
                    <p className="text-base text-gray-600">Editions</p>
                    <ul className="flex overflow-x-auto">
                        {
                            workEditions.sort((editionA, editionB) => {
                                const editionACover = editionA.covers?.length ? 1 : 0;
                                const editionBCover = editionB.covers?.length ? 1 : 0;
                                return editionBCover - editionACover;
                            }).map((edition) => (
                                <li key={edition.key}>
                                    <EditionSnippet edition={edition} />
                                </li>
                            ))
                        }
                    </ul>
                </div>    
            </div>
        </div>
    );
}

export default Page;