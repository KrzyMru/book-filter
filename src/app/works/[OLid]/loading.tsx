import EditionSnippetSkeleton from "./components/edition-snippet-skeleton";

const Loading = () => {
    return (
        <div className="h-full flex flex-col overflow-y-auto py-3 px-3 xs:px-8 md:flex-row">

            <div className="flex flex-col items-center md:max-w-md md:sticky md:top-0 md:h-full md:pr-12">
                <div className="w-[200px] h-[300px] rounded-tr-xl rounded-br-xl bg-gray-200 animate-pulse mb-1" />
                <div className="w-full h-[28px] bg-gray-200 animate-pulse mb-1" />
                <ul className="flex gap-1 flex-wrap mb-2 md:justify-center">
                    {Array.from({ length: 2 }, (_, i) => (
                        <li key={i}>
                            <div className="h-[20px] w-[80px] bg-gray-200 animate-pulse mb-1" />
                        </li>
                    ))}
                </ul>
                <div className="w-[200px] h-[32px] bg-gray-200 animate-pulse mb-2" />
                <div className="w-[150px] h-[18px] bg-gray-200 animate-pulse mb-1" />
            </div>

            <div className="flex flex-col items-center mt-5 md:items-start md:min-w-0 lg:max-w-2xl md:mt-0">
                <div className="w-full shrink-0">
                    <div className="w-full h-[24px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-full h-[24px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-full h-[24px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-full h-[24px] bg-gray-200 animate-pulse mb-3" />
                    <div className="w-full h-[24px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-full h-[24px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-full h-[24px] bg-gray-200 animate-pulse mb-1" />
                    <div className="w-full h-[24px] bg-gray-200 animate-pulse mb-1" />
                </div>
                <div className="w-full mt-6">
                    <div className="w-[100px] h-[18px] bg-gray-200 animate-pulse mb-2" />
                    <ul className="flex flex-wrap mb-2 gap-1">
                        {Array.from({ length: 15 }, (_, i) => (
                            <li key={i}>
                                <div className="h-[20px] w-[50px] bg-gray-200 animate-pulse mb-1" />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full h-[84px] bg-gray-200 animate-pulse mt-6 mb-1 shrink-0" />
                <div className="w-full mt-6">
                    <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse mb-2" />
                    <div className="h-[64px] bg-gray-200 animate-pulse mb-1" />
                    <div className="h-[64px] bg-gray-200 animate-pulse mb-1" />
                </div>
                <div className="w-full mt-6">
                    <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse mb-1" />
                    <ul className="flex overflow-x-auto">
                        {Array.from({ length: 10 }, (_, i) => (
                            <li key={i}>
                                <EditionSnippetSkeleton />
                            </li>
                        ))}
                    </ul>
                </div>    
            </div>
        </div>
    );
}

export default Loading;