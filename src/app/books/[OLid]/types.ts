interface Edition {
    key: string,
    title: string,
    first_sentence?: {
        type: string,
        value: string,
    },
    number_of_pages?: number,
    works?: {
        key: string,
    }[],
    publish_date: string,
    covers: string[],
    publishers: string[],
    authors?: {
        key: string,
    }[],
    identifiers?: {
        goodreads?: string[],
        librarything?: string[],
    },
    physical_format: string,
}

export type { Edition }