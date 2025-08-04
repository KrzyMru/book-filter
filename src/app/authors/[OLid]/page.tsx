import Image from "next/image";
import { Author } from "./types";
import Link from "next/link";
import { AuthorSnippetSearchResponse, WorkSearchResponse } from "@/app/types";
import Bookshelf from "../../components/assets/bookshelf.svg";
import BookOpen from "../../components/assets/book-open.svg";
import Eye from "../../components/assets/eye.svg";
import ClientRating from "@/app/components/client-rating";
import { WorkSnippetProps } from "@/app/components/types";
import WorkSnippet from "@/app/components/work-snippet";

const Page = async ({ params }: { params: Promise<{ OLid: string }>,
}) => {
    const { OLid } = await params;

    const authorResponse = await fetch(`https://openlibrary.org/authors/${OLid}.json`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const authorSnippetsResponse = await fetch(`https://openlibrary.org/search/authors.json?q=key:(${"/authors/"+OLid})&limit=1`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const authorWorksResponse = await fetch(`https://openlibrary.org/search.json?author_key=${OLid}&limit=8&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i&sort=readinglog`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });

    const author: Author = await authorResponse.json();
    const authorSnippetsSearchResponse: AuthorSnippetSearchResponse = await authorSnippetsResponse.json();
    const authorSnippet = authorSnippetsSearchResponse.docs.length === 1 ? authorSnippetsSearchResponse.docs[0] : undefined;
    const authorWorksSearchResponse: WorkSearchResponse = await authorWorksResponse.json();
    const authorWorks: WorkSnippetProps[] = authorWorksSearchResponse.docs;

    const mainPhoto = author.photos && author.photos?.length > 0 ? author.photos[0] : undefined;

    return (
        <div className="h-full flex flex-col overflow-y-auto py-3 px-3 [transition:padding_350ms] xs:px-8 md:flex-row md:justify-center">
            
            <div className="flex flex-col items-center md:max-w-md md:sticky md:top-0 md:h-full md:pr-12">
                <div className="relative size-[180px] rounded-full outline-3 outline-gray-500 shrink-0">
                    <Image 
                        src={
                            mainPhoto ?
                            `https://covers.openlibrary.org/a/id/${mainPhoto}-M.jpg?default=false`
                            : "/fallback-photo.jpg"
                        }
                        alt="Author main photo"
                        fill
                        className="rounded-full shadow-md object-cover"
                    />
                </div>
                <ul className="flex flex-wrap gap-2 mt-2">
                {
                    // First image is the main one (and some are invalid, thus > 0 check)
                    author.photos?.slice(1).filter(photoId => photoId > 0 ? true : false).slice(0,3).map(photoId => (
                        <li key={photoId}>
                            <div className="relative size-[50px] outline-2 outline-gray-500 shrink-0">
                                <Image 
                                    src={`https://covers.openlibrary.org/a/id/${photoId}-S.jpg?default=false`}
                                    alt="Author photo"
                                    fill
                                    className="shadow-sm"
                                />
                            </div>
                        </li>
                    ))
                }
                </ul>
                <div className="mt-1">
                    <p className="text-2xl text-center font-semibold text-gray-900">{author.name}</p>
                    {author.birth_date &&
                        <p className="text-xs text-center text-gray-600 italic">{`${author.death_date ? author.birth_date : 'born '+author.birth_date}${author.death_date ? ' - '+author.death_date : ''}`}</p>
                    }
                </div>
                <div className="w-full flex flex-col items-center mt-1">
                    <div className="flex items-center gap-2">
                        <ClientRating 
                            className="inline size-[18px] -mt-1"
                            initialValue={authorSnippet?.ratings_average ?? 0} 
                        />
                        <p className="text-base text-gray-900 font-semibold">{authorSnippet?.ratings_average ? authorSnippet.ratings_average.toFixed(2) : 0}</p>
                    </div>
                    <p className="text-xs text-gray-600">{`${authorSnippet?.ratings_count ?? 0} ratings${authorSnippet?.work_count ? ' · '+authorSnippet?.work_count+' works' : ''}`}</p>
                </div>
            </div>

            <div className="flex flex-col items-center mt-5 md:items-start md:min-w-0 lg:max-w-2xl md:mt-0">
                <div className={`${author?.bio ? 'block' : 'hidden'}`}>
                    <p className="text-base text-gray-900">{typeof(author.bio) === "string" ? author.bio : author.bio?.value}</p>
                </div>  
                <div className={`w-full mt-6 ${authorSnippet?.top_subjects && authorSnippet.top_subjects?.length > 0 ? 'block' : 'hidden'}`}>
                    <p className="text-base text-gray-600">Top subjects</p>
                    <ul className="flex flex-wrap">
                        {
                            authorSnippet?.top_subjects?.map((subject, index) => (
                                <li key={index}>
                                    <Link
                                        href={`/search?subjects=${subject}&sort=rating&sort_direction=desc&page=1`}
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
                <div className="w-full flex flex-wrap justify-around py-3 gap-3 border-y-1 border-gray-300 mt-6">
                    <div className="flex flex-col items-center">
                        <div className="flex gap-2 items-center">
                            <Image 
                                src={Bookshelf}
                                alt="Already read"
                                title="Already read"
                                className="size-[28px]" 
                            />
                            <p className="text-base text-gray-600">{authorSnippet?.already_read_count}</p>
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
                            <p className="text-base text-gray-600">{authorSnippet?.currently_reading_count}</p>
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
                            <p className="text-base text-gray-600">{authorSnippet?.want_to_read_count}</p>
                        </div>
                        <p className="text-sm text-center text-gray-600">people want to read</p>
                    </div>
                </div>
                <div className={`${author.links && author.links?.length > 0 ? 'block' : 'hidden'} 
                    w-full mt-6 pb-3 border-b-1 border-gray-300`}
                >
                    <p className="text-base text-gray-600">Provided links</p>
                    <ul className="flex flex-col gap-1 mt-1">
                    {
                        author.links?.map(link => (
                            <li key={link.title + link.url}>
                                <div className="flex flex-col">
                                    <p className="text-sm text-gray-900">{link.title}</p>
                                    <Link 
                                        href={link.url}
                                        className="text-xs text-sky-400 w-fit"
                                    >
                                        {link.url}
                                    </Link>
                                </div>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <div className={`
                    ${author.remote_ids && (author.remote_ids?.goodreads || author.remote_ids?.librarything || author.remote_ids?.wikidata || author.remote_ids?.viaf || author.remote_ids?.amazon) 
                    ? 'block' : 'hidden'} 
                    w-full mt-6 pt-3 border-b-1 border-gray-300 pb-3`}
                >
                    <p className="text-base text-gray-600">Other links</p>
                    <div className={`${author.remote_ids?.goodreads ? 'flex flex-col' : 'hidden'}  mt-1`}>
                        <p className="text-sm text-gray-900">Goodreads</p>
                        <Link 
                            href={`https://www.goodreads.com/author/show/${author.remote_ids?.goodreads}`}
                            className="text-xs text-sky-400 w-fit"
                        >
                            {`https://www.goodreads.com/author/show/${author.remote_ids?.goodreads}`}
                        </Link>
                    </div>
                    <div className={`${author.remote_ids?.librarything ? 'flex flex-col' : 'hidden'}  mt-1`}>
                        <p className="text-sm text-gray-900">Librarything</p>
                        <Link 
                            href={`https://www.librarything.com/work/${author.remote_ids?.goodreads}`}
                            className="text-xs text-sky-400 w-fit"
                        >
                            {`https://www.librarything.com/work/${author.remote_ids?.goodreads}`}
                        </Link>
                    </div>
                    <div className={`${author.remote_ids?.wikidata ? 'flex flex-col' : 'hidden'}  mt-1`}>
                        <p className="text-sm text-gray-900">Wikidata</p>
                        <Link 
                            href={`https://www.wikidata.org/wiki/${author.remote_ids?.wikidata}`}
                            className="text-xs text-sky-400 w-fit"
                        >
                            {`https://www.wikidata.org/wiki/${author.remote_ids?.wikidata}`}
                        </Link>
                    </div>
                    <div className={`${author.remote_ids?.viaf ? 'flex flex-col' : 'hidden'}  mt-1`}>
                        <p className="text-sm text-gray-900">Virtual International Authority File</p>
                        <Link 
                            href={`https://viaf.org/viaf/${author.remote_ids?.viaf}`}
                            className="text-xs text-sky-400 w-fit"
                        >
                            {`https://viaf.org/viaf/${author.remote_ids?.viaf}`}
                        </Link>
                    </div>
                    <div className={`${author.remote_ids?.amazon ? 'flex flex-col' : 'hidden'}  mt-1`}>
                        <p className="text-sm text-gray-900">Amazon</p>
                        <Link 
                            href={`https://www.amazon.com/~/e/${author.remote_ids?.amazon}`}
                            className="text-xs text-sky-400 w-fit"
                        >
                            {`https://www.amazon.com/~/e/${author.remote_ids?.amazon}`}
                        </Link>
                    </div>
                </div>
                <div className="w-full mt-6">
                    <p className="text-base text-gray-600">Popular works</p>
                    <ul className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3">
                        {
                            authorWorks.map((work) => (
                                <li key={work.key} className="max-w-[360px]">
                                    <WorkSnippet work={work} />
                                </li>
                            ))
                        }
                        <li key="moreWorks">
                            <Link
                                className="cursor-pointer group"
                                href={`/search?author_key=${OLid}&sort=readinglog&page=1`}
                                title="See more"
                            >
                                <div className="w-full flex justify-center">
                                <div className="mt-3 w-[140px] h-[210px] flex justify-center items-center rounded-tr-xl rounded-br-xl bg-gray-200 shadow-sm [transition:scale_350ms] group-hover:scale-103">
                                    <p className="text-xl text-gray-600 font-semibold">See more</p>
                                </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>   
            </div>
        </div>
    );
}

export default Page;