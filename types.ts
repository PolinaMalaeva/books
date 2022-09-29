import React, {ChangeEvent} from "react";

export type authorsType = {
    name: string,
    birth_year: number,
    death_year: number
};

export type bookType = {
    id: string,
    title: string,
    authors: authorsType[],
    download_count: string,
    formats: {
        "image/jpeg": string
    },
    subjects: string[]
};

export type searchType = {
    handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void,
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    searchBook: () => void,
    search: string
}