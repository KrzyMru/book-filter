import { WorkSnippetProps } from "./components/types";

interface WorkSearchResponse {
    start: number,
    num_found: number,
    docs: WorkSnippetProps[],
}

interface AuthorSnippetSearchResponse {
    start: number,
    num_found: number,
    docs: AuthorSnippet[],
}

interface AuthorSnippet {
    key: string,
    name: string,
    birth_date?: string,
    death_date?: string,
    top_work?: string,
    work_count?: number,
    ratings_average?: number,
    ratings_count?: number,
    want_to_read_count?: number,
    already_read_count?: number,
    currently_reading_count?: number,
}

export type { WorkSearchResponse, AuthorSnippet, AuthorSnippetSearchResponse }