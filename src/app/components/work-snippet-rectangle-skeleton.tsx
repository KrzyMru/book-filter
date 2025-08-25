const WorkSnippetRectangleSkeleton = () => {
    return (
        <div className="flex h-full p-3 outline-none">
            <div className="w-[140px] h-[210px] rounded-tr-xl rounded-br-xl bg-gray-200 animate-pulse" />
            <div className="flex-1 flex flex-col px-2 justify-between">
                <div className="h-[26px] bg-gray-200 animate-pulse" />
                <div className="w-full">
                    <div className="h-[16px] bg-gray-200 mb-1 animate-pulse" />
                    <div className="h-[16px] bg-gray-200 mb-1 animate-pulse" />
                    <div className="h-[30px] bg-gray-200 px-2 py-1 mb-1 animate-pulse" />
                    <div className="h-[30px] bg-gray-200 px-2 py-1 mb-1 animate-pulse" />
                    <div className="h-[30px] bg-gray-200 px-2 py-1 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export default WorkSnippetRectangleSkeleton;