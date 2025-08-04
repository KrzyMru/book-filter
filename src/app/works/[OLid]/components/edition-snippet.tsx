import Image from "next/image";
import { EditionSnippetProps } from "../types";
import Link from "next/link";

const EditionSnippet = ({ edition }: { edition: EditionSnippetProps }) => {
    const bestCover = edition.covers && edition.covers?.length > 0 ? edition.covers[0] : undefined;

    return (
        <Link
            className="flex h-full flex-col cursor-pointer rounded-br-xl rounded-tr-xl group p-3 outline-none focus:inset-ring-3"
            title={edition.title}
            href={edition.key}
        >
            <div className="relative w-[120px] aspect-[2/3] self-center">
                <Image 
                    src={
                        bestCover ? 
                        `https://covers.openlibrary.org/b/id/${bestCover}-M.jpg?default=false` :
                        "/fallback-cover.jpg"
                    }
                    alt="Edition cover"
                    fill
                    className="rounded-br-xl rounded-tr-xl shadow-md transition-[scale] duration-350 group-hover:scale-103"
                />
            </div>
            <div className="flex flex-col mt-1">
                <p className="text-sm text-center text-gray-900">{edition.edition_name}</p>
                <p className="text-sm text-center text-gray-600 line-clamp-2">
                    {edition.publishers?.join(', ')}
                </p>
                <p className="text-sm text-center text-gray-600">{edition.publish_date}</p>
            </div>
        </Link>
    );
}

export default EditionSnippet;