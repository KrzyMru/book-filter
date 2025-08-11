import WorkSnippetSkeleton from "./components/work-snippet-skeleton";

const Loading = () => {
    return (
        <div className="h-full flex flex-col overflow-y-auto">
            <div className="h-full w-full p-10">
                <div className="aspect-[3/2] min-w-0 max-w-md m-auto bg-gray-200 animate-pulse rounded-xl shrink-0" />
                <div className="w-full max-w-[200px] m-auto h-[28px] bg-gray-200 animate-pulse rounded-xl shrink-0 mt-2" />
            </div>
            <div className="mt-3 mx-5 mb-5">
                <div className="mb-1 w-[150px] h-[24px] bg-gray-200 animate-pulse" />
                <div className="mb-1 w-[200px] h-[18px] bg-gray-200 animate-pulse" />
                <ul className="grid grid-cols-1 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
                    {Array.from({ length: 8 }, (_, i) => (
                        <li key={i} className="max-w-[360px]">
                            <WorkSnippetSkeleton />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Loading;