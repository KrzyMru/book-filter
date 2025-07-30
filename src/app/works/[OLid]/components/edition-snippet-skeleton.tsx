const EditionSnippetSkeleton = () => {
    return (
        <div className="flex h-full flex-col p-3 outline-none">
            <div className="w-[120px] h-[180px] rounded-tr-xl rounded-br-xl bg-gray-200 animate-pulse" />
            <div className="flex flex-col mt-1">
                <div className="w-full h-[16px] bg-gray-200 animate-pulse mb-1" />
                <div className="w-full h-[16px] bg-gray-200 animate-pulse mb-1" />
                <div className="w-full h-[16px] bg-gray-200 animate-pulse mb-1" />
                <div className="w-full h-[16px] bg-gray-200 animate-pulse" />
            </div>
        </div>
    );
}

export default EditionSnippetSkeleton;