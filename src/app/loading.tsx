import WorkSnippetSkeleton from "./components/work-snippet-skeleton";

const Loading = () => {
    return (
        <div className="h-full flex flex-col overflow-y-auto">

            <div className="mt-4 mx-5 mb-5">
                <div className="mb-1 h-[24px] bg-gray-200 animate-pulse" />
                <div className="mb-1 h-[18px] bg-gray-200 animate-pulse" />
                <ul className="flex overflow-x-auto">
                    {Array.from({ length: 10 }, (_, i) => (
                        <li key={i}>
                            <WorkSnippetSkeleton />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 mx-5 mb-5">
                <div className="mb-1 h-[24px] bg-gray-200 animate-pulse" />
                <div className="mb-1 h-[18px] bg-gray-200 animate-pulse" />
                <ul className="flex overflow-x-auto">
                    {Array.from({ length: 10 }, (_, i) => (
                        <li key={i}>
                            <WorkSnippetSkeleton />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 mx-5 mb-5">
                <div className="mb-1 h-[24px] bg-gray-200 animate-pulse" />
                <div className="mb-1 h-[18px] bg-gray-200 animate-pulse" />
                <ul className="flex overflow-x-auto">
                    {Array.from({ length: 10 }, (_, i) => (
                        <li key={i}>
                            <WorkSnippetSkeleton />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 mx-5 mb-5">
                <div className="mb-1 h-[24px] bg-gray-200 animate-pulse" />
                <div className="mb-1 h-[18px] bg-gray-200 animate-pulse" />
                <ul className="flex overflow-x-auto">
                    {Array.from({ length: 10 }, (_, i) => (
                        <li key={i}>
                            <WorkSnippetSkeleton />
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default Loading;