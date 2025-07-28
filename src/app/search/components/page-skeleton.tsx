import WorkSnippetRectangleSkeleton from "@/app/components/work-snippet-rectangle-skeleton";

const PageSkeleton = () => {
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="px-5 py-3 overflow-y-auto">
                <div className="mb-1">
                    <div className="h-[32px] bg-gray-200 animate-pulse mb-1" />
                    <div className="h-[16px] bg-gray-200 animate-pulse" />
                </div>
                <ul className="grid gap-[2px] bg-gray-300 lg:grid-cols-2 2xl:grid-cols-3">
                    {Array.from({ length: 10 }, (_, i) => (
                        <li 
                            key={i} 
                            className="bg-white"
                        >
                            <WorkSnippetRectangleSkeleton />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex gap-1 justify-center items-center h-[60px] bg-stone-200 border-t-2 border-gray-300 p-2">
                <div className="size-[42px] rounded-full bg-gray-50 animate-pulse" />
                <div className="size-[42px] rounded-full bg-gray-50 animate-pulse" />
                <div className="size-[42px] rounded-full bg-gray-50 animate-pulse" />
                <div className="size-[42px] rounded-full bg-gray-50 animate-pulse" />
                <div className="size-[42px] rounded-full bg-gray-50 animate-pulse" />
            </div>
        </div>
    );
}

export default PageSkeleton;