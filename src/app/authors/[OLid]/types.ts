interface Author {
    key: string,
    name: string,
    bio?: string | {
        type: string,
        value: string,
    },
    birth_date?: string,
    death_date?: string,
    photos?: number[],
    links?: {
        title: string,
        url: string,
        type: {
            key: string,
        }
    }[],
    remote_ids?: {
        goodreads?: string,
        librarything?: string,
        wikidata?: string,
        viaf?: string,
        amazon?: string,
    },
}

export type { Author }