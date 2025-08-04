import { userSortType } from "../components/navigation-bar/types";

interface SearchParams {
    query?: string,
    author?: string,
    cover?: string,
    author_name?: string,
    author_key?: string,
    subjects?: string,
    person?: string,
    place?: string,
    ratings_min?: string,
    ratings_max?: string,
    pages_min?: string,
    pages_max?: string,
    publish_year_min?: string,
    publish_year_max?: string,
    sort?: userSortType,
    sort_direction?: sortDirection,
    page?: string,
}

export const FilterRanges = {
    MIN_PAGES: 0,
    MAX_PAGES: 2000,
    PAGES_STEP: 10,

    MIN_RATINGS: 0,
    MAX_RATINGS: 5000,
    RATINGS_STEP: 50,

    MIN_PUBLISH_YEAR: 1450,
    MAX_PUBLISH_YEAR: new Date().getFullYear(),
    PUBLISH_YEAR_STEP: 1,
}

type sortType = "" | "rating desc" | "rating asc" | "trending desc" | "trending asc" | "readinglog" | "want_to_read" | "currently_reading" | "already_read" | "old" | "new" | "editions";
type sortDirection = "desc" | "asc";

export type { SearchParams, sortType, sortDirection }