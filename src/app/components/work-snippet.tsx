import Image from "next/image";
import type { WorkSnippetProps } from "./types";
import Eye from "./assets/eye.svg";
import Bookshelf from "./assets/bookshelf.svg";
import BookOpen from "./assets/book-open.svg";
import Link from "next/link";
import ClientRating from "./client-rating";

const WorkSnippet = ({ work }: { work: WorkSnippetProps }) => {
    return (
        <Link
            className="flex h-full flex-col cursor-pointer rounded-xl group p-3 outline-none focus:inset-ring-3"
            title={work.title}
            href={work.key}
        >
            <div className="relative w-[140px] aspect-[2/3] self-center">
                <Image 
                    src={
                        work.cover_i ? 
                        `https://covers.openlibrary.org/b/id/${work.cover_i}-M.jpg?default=false` :
                        "/fallback-cover.jpg"
                    }
                    alt="Work cover"
                    fill
                    className="rounded-br-xl rounded-tr-xl shadow-md transition-[scale] duration-350 group-hover:scale-103"
                />
            </div>
            <div className="flex flex-col px-2 pt-1">
                <p className="text-xs text-center text-gray-600">{`${work.ratings_count ?? 0} ratings`}</p>
                <div className="flex items-center justify-between">
                    <ClientRating 
                        initialValue={work.ratings_average ?? 0}
                        className="inline size-[18px] -mt-2"
                    />
                    <p className="text-sm text-gray-900 font-semibold">{work.ratings_average ? work.ratings_average.toFixed(2) : 0}</p>
                </div>
            </div>
            <div className="flex justify-between px-2 py-1 border-t-1 border-gray-200">
                <Image 
                    src={Bookshelf}
                    alt="Already read"
                    title="Already read"
                    className="size-[16px]" 
                />
                <p className="text-xs text-gray-600">{work.already_read_count ?? 0}</p>
            </div>
            <div className="flex justify-between px-2 py-1 border-t-1 border-gray-200">
                <Image 
                    src={BookOpen}
                    alt="Currently reading"
                    title="Currently reading"
                    className="size-[16px]" 
                />
                <p className="text-xs text-gray-600">{work.currently_reading_count ?? 0}</p>
            </div>
            <div className="flex justify-between px-2 py-1 border-y-1 border-gray-200">
                <Image 
                    src={Eye}
                    alt="Want to read"
                    title="Want to read"
                    className="size-[16px]" 
                />
                <p className="text-xs text-gray-600">{work.want_to_read_count ?? 0}</p>
            </div>
        </Link>
    );
}

export default WorkSnippet;