"use client"
import Image from "next/image";
import React from "react";
import Search from "../assets/search.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchType } from "./types";

const NavigationBar = () => {
    const [searchText, setSearchText] = React.useState<string>("");
    const [searchType, setSearchType] = React.useState<SearchType>("title");
    const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
    const searchRef = React.useRef<HTMLInputElement|null>(null);
    const router = useRouter();

    // Focus search-bar after it appears
    React.useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (searchOpen)
            timeout = setTimeout(() => searchRef.current?.focus(), 0);

        return () => clearTimeout(timeout);
    }, [searchOpen]);

    return (
        <nav className="w-full bg-stone-200 border-b-2 border-gray-300 sticky top-0 z-999">
                <div className={`${searchOpen ? 'block' : 'hidden'} px-3 py-[10px]`}>
                    <div>
                        <input 
                            ref={searchRef}
                            type="search"
                            placeholder={`Search works by ${searchType ?? "text"}`}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter')
                                    router.push(`/search?query=${searchText}&searchBy=${searchType}&page=1`)
                            }}
                            onBlur={() => searchText.length ? null : setSearchOpen(false)}
                            className="w-full bg-white p-2 rounded-xl text-gray-900 border-2 border-gray-400 outline-none focus:shadow-md"
                        />
                    </div>
                </div>
                <div className={`${searchOpen ? 'hidden' : 'flex'} justify-between items-center px-3 py-4`}>
                    <button 
                        className="cursor-pointer"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Image 
                            src={Search}
                            alt="Search"
                            className="size-[28px]" 
                        />
                    </button>
                    <Link 
                        href={"/"}
                        className="text-2xl font-bold text-gray-900"
                    >
                        book-filter
                    </Link>
                    <div className="size-[28px]"></div>
                </div>
        </nav>
    );
}

export default NavigationBar;