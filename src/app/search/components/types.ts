import { ParsedSearchParams } from "../types";

interface PaginationProps extends ParsedSearchParams {
    totalPages: number,
}

export type { PaginationProps }