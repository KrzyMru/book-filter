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

export type { WorkDescriptorProps, WorkEditionSearchResponse, EditionSnippetProps }