const WorkSnippetSkeleton = () => {
    return (
        <div className="flex flex-col h-full p-3 outline-none">
            <div className="w-[140px] h-[210px] rounded-tr-xl rounded-br-xl bg-gray-200 animate-pulse mb-1" />
            <div className="h-[14px] bg-gray-200 animate-pulse mb-1" />
            <div className="h-[22px] bg-gray-200 animate-pulse mb-1" />
            <div className="w-full">
                <div className="h-[22px] bg-gray-200 px-2 py-1 mb-1 animate-pulse" />
                <div className="h-[22px] bg-gray-200 px-2 py-1 mb-1 animate-pulse" />
                <div className="h-[22px] bg-gray-200 px-2 py-1 animate-pulse" />
            </div>
        </div>
    );
}

export default WorkSnippetSkeleton;