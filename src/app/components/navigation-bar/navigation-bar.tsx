"use client"
import Image from "next/image";
import React from "react";
import Search from "./assets/search.svg";
import Filter from "./assets/filter.svg";
import Hide from "./assets/hide.svg";
import Clean from "./assets/clean.svg";
import Person from "./assets/person.svg";
import Sort from "./assets/sort.svg";
import UpArrow from "./assets/up-arrow.svg";
import DownArrow from "./assets/down-arrow.svg";
import Direction from "./assets/direction.svg";
import BookCover from "./assets/book-cover.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RangeFilter from "./range-filter";
import { userSortType } from "./types";
import { FilterRanges, sortDirection } from "@/app/search/types";

const NavigationBar = () => {
    const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>("");

    const [filtersOpen, setFiltersOpen] = React.useState<boolean>(false);
    const [filterPageNumber, setFilterPageNumber] = React.useState<number[]>([FilterRanges.MIN_PAGES, FilterRanges.MAX_PAGES]);
    const [filterRatingsCount, setFilterRatingsCount] = React.useState<number[]>([FilterRanges.MIN_RATINGS, FilterRanges.MAX_RATINGS]);
    const [filterFirstPublishYear, setFilterFirstPublishYear] = React.useState<number[]>([FilterRanges.MIN_PUBLISH_YEAR, FilterRanges.MAX_PUBLISH_YEAR]);
    const [filterAuthor, setFilterAuthor] = React.useState<string>("");
    const [filterSubject, setFilterSubject] = React.useState<string>("");
    const [filterPerson, setFilterPerson] = React.useState<string>("");
    const [filterPlace, setFilterPlace] = React.useState<string>("");
    const [filterWithAuthor, setFilterWithAuthor] = React.useState<boolean|null>(null);
    const [filterWithCover, setFilterWithCover] = React.useState<boolean|null>(null);

    const [sort, setSort] = React.useState<userSortType>("relevance");
    const [sortDirection, setSortDirection] = React.useState<sortDirection>("desc");
    const sorts: userSortType[] = ["relevance", "rating", "trending", "reading log", "want to read", "currently reading", "already read", "publish year", "editions"]; 
    const sortsWithDirection: userSortType[] = ["rating", "trending", "publish year"];

    const searchRef = React.useRef<HTMLInputElement|null>(null);
    const router = useRouter();

    // Focus search-bar after it appears
    React.useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (searchOpen)
            timeout = setTimeout(() => searchRef.current?.focus(), 0);

        return () => clearTimeout(timeout);
    }, [searchOpen]);

    const handleClearSearch = () => {
        setSearchText("");
        setSort("relevance");
        setSortDirection("desc");
        setFilterWithAuthor(null);
        setFilterWithCover(null);
        setFilterAuthor("");
        setFilterSubject("");
        setFilterPerson("");
        setFilterPlace("");
        setFilterPageNumber([FilterRanges.MIN_PAGES, FilterRanges.MAX_PAGES]);
        setFilterRatingsCount([FilterRanges.MIN_RATINGS, FilterRanges.MAX_RATINGS]);
        setFilterFirstPublishYear([FilterRanges.MIN_PUBLISH_YEAR, FilterRanges.MAX_PUBLISH_YEAR]);
    }

    const handleCycleSorts = () => {
        const currentIndex = sorts.indexOf(sort);
        setSort(sorts[(currentIndex + 1) % sorts.length]);
    };
    const handleCycleSortDirections = () => {
        setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    };
    const handleCycleAllowedAuthor = () => {
        if(filterWithAuthor)
            setFilterWithAuthor(false)
        else if (filterWithAuthor === false)
            setFilterWithAuthor(null);
        else
            setFilterWithAuthor(true);
    };
    const handleCycleAllowedCover = () => {
        if(filterWithCover)
            setFilterWithCover(false)
        else if (filterWithCover === false)
            setFilterWithCover(null);
        else
            setFilterWithCover(true);
    };

    const handleSearch = () => {
        router.push(finalSearchPath);
    }

    // Prepare filters for search query
    const filterWithAuthorString = filterWithAuthor !== null ? `&author=${filterWithAuthor}` : '';
    const filterWithCoverString = filterWithCover !== null ? `&cover=${filterWithCover}` : '';
    const filterAuthorString = filterAuthor !== "" ? `&author_name=${filterAuthor}` : '';
    const filterSubjectsString = filterSubject !== "" ? `&subjects=${filterSubject}` : '';
    const filterPersonString = filterPerson !== "" ? `&person=${filterPerson}` : '';
    const filterPlaceString = filterPlace !== "" ? `&place=${filterPlace}` : '';
    const filterRatingsCountMinString = filterRatingsCount[0] === FilterRanges.MIN_RATINGS ?
        '' : `&ratings_min=${filterRatingsCount[0]}`;
    const filterRatingsCountMaxString = filterRatingsCount[1] === FilterRanges.MAX_RATINGS ?
        '' : `&ratings_max=${filterRatingsCount[1]}`;
    const filterPageNumberMinString = filterPageNumber[0] === FilterRanges.MIN_PAGES ?
        '' : `&pages_min=${filterPageNumber[0]}`;
    const filterPageNumberMaxString = filterPageNumber[1] === FilterRanges.MAX_PAGES ?
        '' : `&pages_max=${filterPageNumber[1]}`;
    const filterFirstPublishYearMinString = filterFirstPublishYear[0] === FilterRanges.MIN_PUBLISH_YEAR ?
        '' : `&publish_year_min=${filterFirstPublishYear[0]}`;
    const filterFirstPublishYearMaxString = filterFirstPublishYear[1] === FilterRanges.MAX_PUBLISH_YEAR ?
        '' : `&publish_year_max=${filterFirstPublishYear[1]}`;

    const unifiedFilterString = filterWithAuthorString+filterWithCoverString+filterAuthorString+filterSubjectsString+
        filterPersonString+filterPlaceString+filterRatingsCountMinString+filterRatingsCountMaxString+
        filterPageNumberMinString+filterPageNumberMaxString+filterFirstPublishYearMinString+filterFirstPublishYearMaxString;

    const parsedSortDirection = sortsWithDirection.includes(sort) ? `&sort_direction=${sortDirection}` : '';

    const finalSearchPath = `/search?query=${searchText}${unifiedFilterString}&sort=${sort}${parsedSortDirection}&page=1`;

    return (
        <nav className="w-full bg-stone-100 border-b-2 border-gray-300 sticky top-0 z-999">
            <div className={`px-3 py-2 ${searchOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col gap-1 md:flex-row">
                    <div className="flex-1 flex flex-wrap gap-1">
                        <div className="flex-1 flex relative">
                            <input 
                                ref={searchRef}
                                type="search"
                                placeholder="Search works"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : null}
                                className="flex-1 bg-white p-2 pr-9 rounded-xl text-gray-900 border-2 border-gray-400 outline-none focus:shadow-md"
                            />
                            <button
                                className="absolute top-1/2 -translate-y-1/2 right-1 flex bg-gray-100 border-2 border-gray-400 items-center p-1 h-fit self-center rounded-full cursor-pointer shrink-0 hover:shadow-md focus:outline-3"
                                title="Search"
                                onClick={handleSearch}
                            >
                                <Image 
                                    src={Search}
                                    alt="Search"
                                    className="size-[16px]" 
                                />
                            </button>
                        </div>
                        <button
                            className="flex bg-gray-100 border-2 border-gray-400 items-center p-1 h-fit self-center rounded-full cursor-pointer shrink-0 hover:shadow-md focus:outline-3"
                            title="Clear search"
                            onClick={handleClearSearch}
                        >
                            <Image 
                                src={Clean}
                                alt="Clear"
                                className="size-[24px]" 
                            />
                        </button>
                        <button
                            className="flex bg-gray-100 border-2 border-gray-400 items-center p-1 h-fit self-center rounded-full cursor-pointer shrink-0 hover:shadow-md focus:outline-3"
                            title="Hide search"
                            onClick={() => setSearchOpen(false)}
                        >
                            <Image 
                                src={Hide}
                                alt="Hide"
                                className="size-[24px]" 
                            />
                        </button>
                    </div>
                    <div className="flex justify-between flex-wrap gap-1">
                        <div className="flex gap-1">
                            <button
                                className="w-[180px] flex items-center bg-amber-100 p-2 rounded-xl border-2 border-gray-400 cursor-pointer hover:shadow-md focus:outline-3"
                                title="Sort type"
                                onClick={handleCycleSorts}
                            >
                                <Image 
                                    src={Sort}
                                    alt="Sort"
                                    className="size-[28px]" 
                                />
                                <p className="text-base text-gray-900 font-semibold first-letter:uppercase">{sort}</p>
                            </button>
                            <button
                                className={`w-fit flex items-center p-2 rounded-xl border-2 border-gray-400 ${sortsWithDirection.includes(sort) ? 'bg-amber-100 cursor-pointer' : 'bg-gray-200 cursor-default pointer-events-none'} hover:shadow-md focus:outline-3`}
                                title="Sort direction"
                                onClick={handleCycleSortDirections}
                            >
                                <Image 
                                    key={sortDirection}
                                    src={
                                        sortsWithDirection.includes(sort) ? 
                                            sortDirection === "desc" ? DownArrow : UpArrow
                                        :
                                            Direction
                                    }
                                    alt="Direction"
                                    className="size-[28px]" 
                                />
                            </button>
                        </div>
                        <button
                            className="w-fit flex items-center bg-orange-200 p-2 rounded-xl border-2 border-gray-400 cursor-pointer hover:shadow-md focus:outline-3"
                            title="Toggle filter panel"
                            onClick={() => setFiltersOpen(!filtersOpen)}
                        >
                            <Image 
                                src={Filter}
                                alt="Filter"
                                className="size-[28px]" 
                            />
                            <p className="text-base text-gray-900 font-semibold">Filters</p>
                        </button>
                    </div>
                </div>
            </div>
            <div inert={!(searchOpen && filtersOpen)} className={`flex flex-col gap-1 border-gray-300 overflow-y-auto transition-[max-height,padding,border-width,opacity] duration-350 ${searchOpen && filtersOpen ? 'border-t-2 max-h-100 p-3 opacity-100' : 'border-t-0 max-h-0 p-0 opacity-0'} focus:outline-3`}>
                <div className="flex flex-wrap gap-1">
                    <button
                        className={`w-fit flex items-center p-2 rounded-xl border-2 border-gray-400 cursor-pointer ${filterWithAuthor ? 'bg-green-200' : filterWithAuthor === false ? 'bg-red-200' : 'bg-gray-200'} hover:shadow-md focus:outline-3`}
                        title={filterWithAuthor ? 'Only works that have an author' : filterWithAuthor === false ? 'Only works that don\'t have an author' : 'Works may lack an author'}
                        onClick={handleCycleAllowedAuthor}
                    >
                        <Image 
                            src={Person}
                            alt="Author"
                            className="size-[16px]" 
                        />
                        <p className="text-base text-gray-900 font-semibold w-[60px]">Author</p>
                    </button>
                    <button
                        className={`w-fit flex items-center p-2 rounded-xl border-2 border-gray-400 cursor-pointer ${filterWithCover ? 'bg-green-200' : filterWithCover === false ? 'bg-red-200' : 'bg-gray-200'} hover:shadow-md focus:outline-3`}
                        title={filterWithCover ? 'Only works that have a cover' : filterWithCover === false ? 'Only works that don\'t have a cover' : 'Works may lack a cover'}
                        onClick={handleCycleAllowedCover}
                    >
                        <Image 
                            src={BookCover}
                            alt="Cover"
                            className="size-[16px]" 
                        />
                        <p className="text-base text-gray-900 font-semibold w-[60px]">Cover</p>
                    </button>
                </div>
                <div className="flex flex-col my-1">
                    <label 
                        htmlFor="authorInput"
                        className="text-sm font-semibold text-gray-900 w-fit"
                    >
                        Author
                    </label>
                    <input 
                        id="authorInput"
                        type="search"
                        placeholder="Name"
                        value={filterAuthor}
                        onChange={(e) => setFilterAuthor(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : null}
                        className="flex-1 text-sm bg-white p-2 rounded-xl text-gray-900 border-2 border-gray-400 outline-none focus:shadow-md"
                    />
                    <label 
                        htmlFor="subjectInput"
                        className="text-sm font-semibold text-gray-900 w-fit"
                    >
                        Subjects
                    </label>
                    <input 
                        id="subjectInput"
                        type="search"
                        placeholder="Fantasy, horror ..."
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : null}
                        className="flex-1 text-sm bg-white p-2 rounded-xl text-gray-900 border-2 border-gray-400 outline-none focus:shadow-md"
                    />
                    <label 
                        htmlFor="personInput"
                        className="text-sm font-semibold text-gray-900 w-fit"
                    >
                        Person
                    </label>
                    <input 
                        id="personInput"
                        type="search"
                        placeholder="Hero's name"
                        value={filterPerson}
                        onChange={(e) => setFilterPerson(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : null}
                        className="flex-1 text-sm bg-white p-2 rounded-xl text-gray-900 border-2 border-gray-400 outline-none focus:shadow-md"
                    />
                    <label 
                        htmlFor="placeInput"
                        className="text-sm font-semibold text-gray-900 w-fit"
                    >
                        Place
                    </label>
                    <input 
                        id="placeInput"
                        type="search"
                        placeholder="Name of a place"
                        value={filterPlace}
                        onChange={(e) => setFilterPlace(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : null}
                        className="flex-1 text-sm bg-white p-2 rounded-xl text-gray-900 border-2 border-gray-400 outline-none focus:shadow-md"
                    />
                </div>
                <RangeFilter 
                    label="Ratings count"
                    min={FilterRanges.MIN_RATINGS} step={FilterRanges.RATINGS_STEP} max={FilterRanges.MAX_RATINGS}
                    values={filterRatingsCount}
                    setValues={setFilterRatingsCount}
                    maxAsterisk
                />
                <RangeFilter 
                    label="Page number"
                    min={FilterRanges.MIN_PAGES} step={FilterRanges.PAGES_STEP} max={FilterRanges.MAX_PAGES}
                    values={filterPageNumber}
                    setValues={setFilterPageNumber}
                    maxAsterisk
                />
                <RangeFilter 
                    label="First publish year"
                    min={FilterRanges.MIN_PUBLISH_YEAR} step={FilterRanges.PUBLISH_YEAR_STEP} max={FilterRanges.MAX_PUBLISH_YEAR}
                    values={filterFirstPublishYear}
                    setValues={setFilterFirstPublishYear}
                />
            </div>
            <div className={`${searchOpen ? 'hidden' : 'flex'} justify-between items-center px-3 py-4`}>
                <button 
                    className="cursor-pointer shrink-0 outline-gray-900 focus-visible:outline-3"
                    onClick={() => setSearchOpen(true)}
                    type="button"
                    title="Search works"
                >
                    <Image 
                        src={Search}
                        alt="Search"
                        className="size-[28px]" 
                    />
                </button>
                <Link 
                    href={"/"}
                    className="text-2xl text-gray-900 font-serif tracking-wider px-2 outline-gray-900 focus-visible:outline-3"
                >
                    book-filter
                </Link>
                <div className="size-[28px]" />
            </div>
        </nav>
    );
}

export default NavigationBar;