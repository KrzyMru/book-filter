import Link from "next/link";

const SeeMoreSnippet = ({ link }: { link: string }) => {
    return (
        <Link
            className="cursor-pointer group outline-none"
            href={link}
            title="See more"
        >
            <div className="w-full flex justify-center pb-3 group-focus:inset-ring-3 rounded-tr-xl rounded-br-xl">
                <div className="mt-3 w-[140px] h-[210px] flex justify-center items-center rounded-tr-xl rounded-br-xl bg-gray-200 shadow-sm [transition:scale_350ms] group-hover:scale-103">
                    <p className="text-xl text-gray-600 font-semibold">See more</p>
                </div>
            </div>
        </Link>
    );
}

export default SeeMoreSnippet;