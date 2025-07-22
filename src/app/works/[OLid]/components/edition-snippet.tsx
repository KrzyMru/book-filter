"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Edition } from "../types";

const EditionSnippet = ({ edition }: { edition: Edition }) => {
    const router = useRouter();

    return (
        <button 
            className="flex flex-col shadow-sm cursor-pointer rounded-br-xl rounded-tr-xl inset-ring-gray-50 hover:shadow-md hover:inset-ring-2"
            title={edition.title}
            onClick={() => router.push(edition.key)}
        >
            <div className="relative w-[120px] aspect-[2/3]">
                <Image 
                    src={edition.cover_i ? 
                        `https://covers.openlibrary.org/b/id/${edition.cover_i}-M.jpg?default=false` :
                        "/fallback-cover.jpg"
                    }
                    alt="No cover"
                    fill
                    className="-z-1 rounded-br-xl rounded-tr-xl"
                />
            </div>
        </button>
    );
}

export default EditionSnippet;