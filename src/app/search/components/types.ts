import { SearchParams } from "../types";

interface PaginationProps extends Omit<SearchParams, "page"> {
    page: number,
    totalPages: number,
}

export type { PaginationProps }