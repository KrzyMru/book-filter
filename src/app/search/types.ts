interface SearchParams {
    query: string,
    searchBy: string,
    page: string,
}

interface ParsedSearchParams {
    query: string,
    searchBy: string,
    page: number,
}

export type { SearchParams, ParsedSearchParams }