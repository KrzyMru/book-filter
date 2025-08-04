import { userSortType } from "../../components/navigation-bar/types";
import { sortDirection, sortType } from "../types";

const TranslateSortType = (userSort: userSortType, sortDirection?: sortDirection): sortType => {
    const parsedSortDirection = sortDirection ?? "desc";
    if(userSort === "rating" || userSort === "trending")
        return (userSort+" "+parsedSortDirection) as sortType;
    if(userSort === "relevance")
        return "";
    if(userSort === "reading log")
        return "readinglog";
    if(userSort === "already read")
        return "already_read";
    if(userSort === "currently reading")
        return "currently_reading";
    if(userSort === "want to read")
        return "want_to_read";
    if(userSort === "publish year")
        if(parsedSortDirection === "desc")
            return "new";
        else 
            return "old";
    if(userSort === "editions")
        return userSort;

    return "";
}

export default TranslateSortType;