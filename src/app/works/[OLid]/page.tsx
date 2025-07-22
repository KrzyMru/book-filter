import Image from "next/image";
import { Author, AuthorSearchResponse, WorkDescriptorProps, WorkKeySearchResponse, WorkKeySnippetProps } from "./types";
import Link from "next/link";
import EditionSnippet from "./components/edition-snippet";

const Page = async ({ params }: { params: Promise<{ OLid: string }>,
}) => {
    const { OLid } = await params;

    // This is needed because both of those endpoints contain different info
    const workSnippetResponse = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(`key:(/works/${OLid})`)}&limit=1&fields=key,title,ratings_average,ratings_count,want_to_read_count,currently_reading_count,already_read_count,cover_i,editions`, {
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

    const workSearchResponse: WorkKeySearchResponse = await workSnippetResponse.json();
    const workSnippet: WorkKeySnippetProps = workSearchResponse.docs[0];
    const workDescriptor: WorkDescriptorProps  = await workDescriptorResponse.json();

    const authorKeys = workDescriptor.authors.map(author => author.author.key); 
    const authorNameRequest = await fetch(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(`key:(${authorKeys.join(' OR ')})`)}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const authorSearchResponse: AuthorSearchResponse = await authorNameRequest.json();
    const authors: Author[] = authorSearchResponse.docs;

    return (
        <div className="flex flex-col items-center py-3 px-8">

            <div className="relative w-[200px] aspect-[2/3]">
                <Image 
                    src={workSnippet.cover_i ? 
                        `https://covers.openlibrary.org/b/id/${workSnippet.cover_i}-L.jpg?default=false` :
                        "/fallback-cover.jpg"
                    }
                    alt="No cover"
                    fill
                    className="-z-1 rounded-br-xl rounded-tr-xl"
                />
            </div>

            <div className="flex flex-col items-center mt-2">
                <p className="text-2xl font-semibold text-gray-900">{workDescriptor.title}</p>
                <ul>
                    {
                        authors.map((author, index) => (
                            <span key={author.key}>
                                <Link
                                    href={`/authors/${author.key}`}
                                    title="See author information"
                                    className="text-lg text-gray-600 hover:underline"
                                >
                                    {author.name}
                                </Link>
                                {index !== authors.length - 1 && ', '}
                            </span>
                        ))
                    }
                </ul>
                <div className="flex items-center gap-4 mt-2">
                    <div>
                        Rating here
                    </div>
                    <p className="text-2xl text-gray-900 font-semibold">{workSnippet.ratings_average.toFixed(2)}</p>
                </div>
                <div className="mt-1">
                    <p className="text-sm text-gray-600">{`${workSnippet.ratings_count} ratings`}</p>
                </div>
                <div className="mt-5">
                    <p className="text-base text-gray-900 whitespace-pre-wrap">{typeof(workDescriptor.description) === "string" ? workDescriptor.description : workDescriptor.description.value}</p>
                </div>
                <div className="w-full mt-6">
                    <p className="text-base text-gray-600">Genres</p>
                    <ul>
                        {
                            workDescriptor.subjects.map((subject) => (
                                <Link
                                    key={subject}
                                    href={``}
                                    title={subject}
                                    className="text-base font-semibold text-gray-900 mr-4 underline decoration-2 underline-offset-5 decoration-green-500 hover:decoration-green-300"
                                >
                                    {subject}
                                </Link>
                            ))
                        }
                    </ul>
                </div> 
                <div className="w-full mt-6">
                    <div className="mb-1">
                        <p className="text-base text-gray-600">Editions</p>
                    </div>
                    <ul>
                        {
                            workSnippet.editions.docs.map((edition) => (
                                <li key={edition.key}>
                                    <EditionSnippet edition={edition} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-full mt-6">
                    <div>
                        Author info here
                    </div>
                </div>
                <div className="w-full mt-6">
                    <div className="mb-1">
                        <p className="text-base text-gray-600">Recommendations</p>
                    </div>
                </div>             
            </div>
        </div>
    );
}

export default Page;