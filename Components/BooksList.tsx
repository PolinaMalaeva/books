import Link from "next/link";
import Image from "next/image";
import React, {FC, useEffect, useState} from "react";
import {getVisitedIds} from "../customFunctions/main";
import {bookType} from "../types";

type booksTypeProps = {
    allBooks: bookType[]
}

const BooksList: FC<booksTypeProps> = ({allBooks}) => {
    const [visitedBookIds, setVisitedBook] = useState<string[]>([]);

    useEffect(() => {
        setVisitedBook(getVisitedIds());
    }, [])

    const isVisited = (id: string) => {
        let ids: string[] = visitedBookIds ?? [];

        return !!ids.find(item => item === id);
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 leading-5">
            {!allBooks.length
                ? <p className="mt-40 text-center col-start-1 col-end-5">
                    Книг не найдено
                </p>
                : allBooks.map(({
                                    id,
                                    title,
                                    authors,
                                    download_count,
                                    formats
                                }) => (

                    <Link href={`/books/${id}`}
                          key={id}>
                        <a>
                            <div className={isVisited(id) ? '[opacity:0.6]' : ''}>
                                <div className="flex min-h-[180px] max-h-[180px] space-x-2 p-5 pb-48 items-start border
                                border-blue-900 rounded bg-blue-100 transition-all duration-300 cursor-pointer
                                hover:bg-gray-100/80 hover:[box-shadow:_0_0_10px_5px_rgba(0,_0,_0,_0.5)] sm:pb-48 lg:pb-5">
                                    <div className="block">
                                        <Image src={formats["image/jpeg"]}
                                               alt="book"
                                               width={130}
                                               height={175}
                                               className="w-full h-full object-cover block"/>
                                    </div>
                                    <div className="h-max">
                                        <p className="text-blue-900 text-base font-bold leading-5 max-w-[190px]
                                        max-h-[40px] overflow-hidden">
                                            {title}
                                        </p>
                                        <div className="max-w-[190px] max-h-[58px] overflow-hidden">
                                            {authors.map(({name, birth_year, death_year},
                                                          index) => (
                                                <div key={index} className="">
                                                    <i className="text-sm">
                                                        {name} (
                                                        <strong className="text-xs">
                                                            {birth_year || "unknown"} - {death_year || "unknown"}
                                                        </strong>)
                                                    </i>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm ">
                                            <strong className="text-red-800">Number of
                                                downloads:</strong> {download_count}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
        </div>
    )
}

export default BooksList;