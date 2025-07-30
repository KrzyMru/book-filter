import WorkSnippetSkeleton from "@/app/components/work-snippet-skeleton";


const Loading = () => {
    return (
        <div className="h-full flex flex-col overflow-y-auto py-3 px-3 xs:px-8">

            <div className="flex flex-col items-center">
                <div className="w-[200px] h-[300px] rounded-tr-xl rounded-br-xl bg-gray-200 animate-pulse mb-1" />
                <div className="w-full h-[28px] bg-gray-200 animate-pulse mb-1" />
                <ul className="flex gap-1 flex-wrap mb-2">
                    {Array.from({ length: 2 }, (_, i) => (
                        <li key={i}>
                            <div className="h-[20px] w-[80px] bg-gray-200 animate-pulse mb-1" />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col items-center mt-5">
                <div className="w-full shrink-0">
                    <div className="w-full h-[22px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-full h-[22px] bg-gray-200 animate-pulse mb-1" />
                </div>
                <div className="w-full h-[84px] bg-gray-200 animate-pulse mt-6 mb-1 shrink-0" />
                <div className="w-full mt-6">
                    <div className="w-[100px] h-[22px] bg-gray-200 animate-pulse mb-2" />
                    <div className="h-[18px] bg-gray-200 animate-pulse mb-1" />
                    <div className="h-[18px] bg-gray-200 animate-pulse mb-1" />
                </div>
                <div className="w-full mt-6">
                    <div className="w-[100px] h-[22px] bg-gray-200 animate-pulse mb-2" />
                    <div className="w-[65px] h-[18px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-[200px] h-[18px] bg-gray-200 animate-pulse mb-2" />
                    <div className="w-[65px] h-[18px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-[200px] h-[18px] bg-gray-200 animate-pulse mb-1" />
                </div>
                <div className="w-full mt-6">
                    <div className="w-[100px] h-[22px] bg-gray-200 animate-pulse mb-1" />
                    <ul className="flex overflow-x-auto">
                        {Array.from({ length: 10 }, (_, i) => (
                            <li key={i}>
                                <WorkSnippetSkeleton />
                            </li>
                        ))}
                    </ul>
                </div>    
            </div>
        </div>
    );
}

export default Loading;