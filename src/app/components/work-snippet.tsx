"use client"
import Image from "next/image";
import type { WorkSnippetProps } from "./types";
import Eye from "./assets/eye.svg";
import Bookshelf from "./assets/bookshelf.svg";
import BookOpen from "./assets/book-open.svg";
import { useRouter } from "next/navigation";
import { Rating } from 'react-simple-star-rating';

const WorkSnippet = ({ work }: { work: WorkSnippetProps }) => {
    const router = useRouter();

    return (
        <button 
            className="flex flex-col shadow-sm cursor-pointer rounded-tr-xl inset-ring-gray-50 hover:shadow-md hover:inset-ring-2"
            title={work.title}
            onClick={() => router.push(`${work.key}`)}
        >
            <div className="relative w-[140px] aspect-[2/3]">
                <Image 
                    src={work.cover_i ? 
                        `https://covers.openlibrary.org/b/id/${work.cover_i}-M.jpg?default=false` :
                        "/fallback-cover.jpg"
                    }
                    alt="No cover"
                    fill
                    className="-z-1 rounded-br-xl rounded-tr-xl"
                />
            </div>
            <div className="flex flex-col px-2 py-1 border-t-1 border-gray-200">
                <p 
                    className="text-xs text-gray-600" 
                    title={`${work.ratings_count} reviews`}
                >
                    {work.ratings_count}
                </p>
                <Rating
                    readonly
                    iconsCount={5}
                    initialValue={work.ratings_average}
                    allowFraction
                    fillColor="#facc15" // Tailwind yellow-400
                    SVGclassName="inline size-[24px]"
                />
            </div>
            <div className="flex justify-between px-2 py-1 border-t-1 border-gray-200">
                <Image 
                    src={Bookshelf}
                    alt="Already read"
                    title="Already read"
                    className="size-[16px]" 
                />
                <p className="text-xs text-gray-600">{work.already_read_count}</p>
            </div>
            <div className="flex justify-between px-2 py-1 border-t-1 border-gray-200">
                <Image 
                    src={BookOpen}
                    alt="Currently reading"
                    title="Currently reading"
                    className="size-[16px]" 
                />
                <p className="text-xs text-gray-600">{work.currently_reading_count}</p>
            </div>
            <div className="flex justify-between px-2 py-1 border-y-1 border-gray-200">
                <Image 
                    src={Eye}
                    alt="Want to read"
                    title="Want to read"
                    className="size-[16px]" 
                />
                <p className="text-xs text-gray-600">{work.want_to_read_count}</p>
            </div>
        </button>
    );
}

export default WorkSnippet;