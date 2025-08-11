import Image from "next/image";
import Link from "next/link";
import { WorkSnippetProps } from "../../types";
import ClientRating from "../../client-rating";

const RandomWorkSnippet = ({ work }: { work: WorkSnippetProps }) => {
    return (
        <Link
            className="flex h-full w-fit flex-col cursor-pointer rounded-xl group p-3 outline-none focus:inset-ring-3"
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
                <div className="flex items-center justify-center gap-2">
                    <ClientRating 
                        initialValue={work.ratings_average ?? 0}
                        className="inline size-[18px] -mt-2"
                    />
                    <p className="text-sm text-gray-900 font-semibold">{work.ratings_average ? work.ratings_average.toFixed(2) : 0}</p>
                </div>
            </div>
        </Link>
    );
}

export default RandomWorkSnippet;