import { userSortType } from "@/app/components/navigation-bar/types";
import { sortDirection, sortType } from "../types";

const translateSort = (userSort?: string, sortDirection?: string): sortType => {
    const userSorts: Set<userSortType> = new Set(["already read", "currently reading", "editions", "publish year", "rating", "reading log", "relevance", "trending", "want to read"]);
    const sortDirections: Set<sortDirection> = new Set(["asc", "desc"]);

    const parsedSort = userSorts.has(userSort as userSortType) ? (userSort as userSortType) : "relevance";
    const parsedSortDirection = sortDirections.has(sortDirection as sortDirection) ? (sortDirection as sortDirection) : "desc";

    if(parsedSort === "rating" || parsedSort === "trending")
        return (parsedSort+" "+parsedSortDirection) as sortType;
    if(parsedSort === "relevance")
        return "";
    if(parsedSort === "reading log")
        return "readinglog";
    if(parsedSort === "already read")
        return "already_read";
    if(parsedSort === "currently reading")
        return "currently_reading";
    if(parsedSort === "want to read")
        return "want_to_read";
    if(parsedSort === "publish year")
        if(parsedSortDirection === "desc")
            return "new";
        else 
            return "old";
    if(parsedSort === "editions")
        return parsedSort;

    return "";
}

export default translateSort;