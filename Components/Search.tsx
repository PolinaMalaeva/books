import React, {FC} from "react";
import {searchType} from "../types";

type search = {
    searchData: searchType
}

const Search: FC<search> = ({searchData}) => {
    const {handleChangeInput, handleKeyDown, searchBook, search} = searchData;

    return (
        <div className="relative max-w-[500px] w-full">
            <input type="text"
                   value={search}
                   placeholder="search"
                   className="px-5 py-2.5 bg-gray-50 w-full rounded hover:bg-gray-100 transition-all duration-300
                       focus:shadow-blue-500 focus:shadow-md focus:outline-none"
                   onChange={(e) => handleChangeInput(e)}
                   onKeyDown={(e) => handleKeyDown(e)}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor"
                 className="w-6 h-6 absolute top-1/2 right-1.5 -translate-y-1/2 [stroke-width:1.5] cursor-pointer"
                 onClick={searchBook}>
                <path
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
        </div>
    )
}

export default Search;
