export type authorsType = {
    name: string,
    birth_year: number,
    death_year: number
};

export type booksType = {
    results: {
        id: string,
        title: string,
        authors: authorsType[],
        download_count: string,
        formats: {
            "image/jpeg": string
        }
    }[]
};
