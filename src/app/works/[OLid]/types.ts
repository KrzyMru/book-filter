interface WorkDescriptorProps {
    key: string,
    title: string,
    description?: string | {
        type: string,
        value: string,
    },
    subjects?: string[],
    authors?: {
        author: {
            key: string,
        },
        type: {
            key: string,
        },
    }[],
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

interface WorkEditionSearchResponse {
    size: number,
    entries: EditionSnippetProps[],
}

interface EditionSnippetProps {
    key: string,
    title: string,
    publish_date?: string,
    edition_name?: string,
    covers?: string[],
    publishers?: string[],
    contributors?: {
        role: string,
        name: string,
    }[],
}

export type { WorkDescriptorProps, AuthorSnippetSearchResponse, WorkEditionSearchResponse, AuthorSnippet, EditionSnippetProps }