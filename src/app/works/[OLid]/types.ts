import { WorkSnippetProps } from "@/app/components/types";

interface WorkDescriptorProps {
    key: string,
    title: string,
    description: string | {
        type: string,
        value: string,
    },
    subjects: string[],
    created: {
        type: string,
        value: string,
    },
    last_modified: {
        type: string,
        value: string,
    },
    authors: {
        author: {
            key: string,
        },
        type: {
            key: string,
        },
    }[],
}

interface WorkKeySnippetProps extends WorkSnippetProps {
    editions: {
        start: number,
        num_found: number,
        docs: Edition[],
    }
}

interface WorkKeySearchResponse {
    start: number,
    num_found: number,
    docs: WorkKeySnippetProps[],
}

interface AuthorSearchResponse {
    start: number,
    num_found: number,
    docs: Author[],
}

interface Author {
    name: string,
    key: string,
}

interface Edition {
    key: string,
    title: string,
    cover_i: string,
}

export type { WorkDescriptorProps, WorkKeySearchResponse, WorkKeySnippetProps, AuthorSearchResponse, Author, Edition }