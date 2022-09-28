import type {GetStaticProps} from 'next';
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import Image from "next/image";
import {booksType} from "../types";

type booksTypeProps = {
    books: booksType
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch(`https://gutendex.com/books`);
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {books: data},
    }
};

const Books: FC<booksTypeProps> = ({books}) => {
    const [allBooks, setAllBooks] = useState<booksType>(books);
    const [search, setSearch] = useState<string>("");
    let page = 2;
    let isRequest = true;
    const language = [
        {
            id: "eng",
            label: "English",
            defaultChecked: true
        },
        {
            id: "fr",
            label: "France",
            defaultChecked: false
        },
        {
            id: "de",
            label: "Deutsche",
            defaultChecked: false
        },
    ]

    const getBooks = async () => {
        isRequest = false;

        const response = await fetch('https://gutendex.com/books/?page=' + page + '&search=' + search);
        const data = await response.json();

        if (!data) {
            return {
                notFound: true,
            }
        }

        if (page === 1) {
            setAllBooks(() => ({
                results: [...data.results]
            }));
        } else {
            setAllBooks((prevState) => ({
                results: [...prevState.results, ...data.results]
            }));
        }

        isRequest = true;
        page++;
    }

    const checkPosition = async () => {
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const threshold = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight) - 50;
        const position = scrolled + screenHeight;

        if (position >= threshold && isRequest) {
            getBooks();
        }
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const searchBook = async () => {
        if (isRequest) {
            page = 1;
            getBooks();
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            searchBook();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkPosition);
    }, [])

    return (
        <div className="py-5">
            <div className="flex justify-between mb-3 items-center">
                <div>
                    <p className="font-bold mb-3">Languages</p>
                    <div className="flex space-x-2.5">
                        {language && language.map(({id, label, defaultChecked}, index) => (
                            <section key={index}>
                                <input className="w-5 h-5 mr-1.5 align-top rounded-none"
                                       type="radio"
                                       name="checkbox"
                                       defaultChecked={defaultChecked}
                                       value=""
                                       id={id}/>
                                <label className=""
                                       htmlFor="eng">
                                    {label}
                                </label>
                            </section>
                        ))}
                    </div>
                </div>
                <div className="relative max-w-[500px] w-full">
                    <input type="text"
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
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 leading-5">

                {!allBooks.results.length
                    ? <p className="mt-40 text-center col-start-1 col-end-5">
                        Книг не найдено
                    </p>
                    : allBooks.results.map(({
                                                id,
                                                title,
                                                authors,
                                                download_count,
                                                formats
                                            }) => (
                        <div key={id}
                             className="flex min-h-[180px] max-h-[180px] space-x-2 p-5 items-start border border-blue-900
                         rounded bg-blue-100 transition-all duration-300">
                            <div className="block">
                                <Image src={formats["image/jpeg"]}
                                       alt="book"
                                       width={130}
                                       height={175}
                                       className="w-full h-full object-cover block"/>
                            </div>
                            <div className="h-max">
                                <p className="text-blue-900 text-base font-bold leading-5 max-w-[190px] max-h-[40px]
                            overflow-hidden">
                                    {title}
                                </p>
                                <div className="max-w-[190px] max-h-[58px] overflow-hidden">
                                    {authors.map(({name, birth_year, death_year}, index) => (
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
                                    <strong className="text-red-800">Number of downloads:</strong> {download_count}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Books;
