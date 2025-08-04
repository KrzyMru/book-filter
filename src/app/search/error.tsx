"use client"

const Error = () => {
    return (
        <div className="flex flex-col p-3">
            <p className="text-2xl text-gray-900">Something went wrong</p>
            <p className="text-sm text-gray-400">An error occurred while searching.</p>
            <p className="text-sm text-gray-400 mt-1">This usually happens when the search query is too broad.</p>
            <p className="text-sm text-gray-400">Please adjust your filters or query and try again.</p>
        </div>
    );
}

export default Error;