import type {GetStaticProps} from 'next';
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {bookType, searchType} from "../../types";
import Search from "../../Components/Search";
import Languages from "../../Components/Languages";
import BooksList from "../../Components/BooksList";
import Head from "next/head";
import UpButton from "../../Components/UpBtn";

type booksTypeProps = {
    books: bookType[],
    version: string
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
        props: {books: data.results},
    }
};

const Books: FC<booksTypeProps> = ({books, version}) => {
    const [allBooks, setAllBooks] = useState<bookType[]>(books);
    const [search, setSearch] = useState<string>("");

    let isRequest = true;

    const checkPosition = async () => {
        if (window.location.pathname === '/books') {
            let urlPage = new URL(window.location.href);
            const screenHeight = window.innerHeight;
            const scrolled = window.scrollY;
            const threshold = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight) - 50;
            const position = scrolled + screenHeight;

            if (position >= threshold && isRequest) {
                urlPage.searchParams.set('page', (urlPage.searchParams.has('page'))
                    ? `${Number(urlPage.searchParams.get('page')) + 1}` : "2");
                history.pushState({}, '', urlPage.search);
                await getBooks();
            }
        }
    }

    const getBooks = async () => {
        isRequest = false;
        let url = new URL(window.location.href);

        const response = await fetch('https://gutendex.com/books/' + url.search);
        const data = await response.json();

        if (!data) {
            return {
                notFound: true,
            }
        }

        if (url.searchParams.get('page') === "1") {
            setAllBooks([...data.results]);
        } else {
            setAllBooks((prevState) => ([...prevState, ...data.results]));
        }

        isRequest = true;
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            await searchBook();
        }
    }

    const searchBook = async () => {
        if (isRequest) {
            let url = new URL(window.location.href);
            url.searchParams.set('search', search);
            url.searchParams.set('page', "1");
            history.pushState({}, '', url.search);
            await getBooks();
        }
    }

    useEffect(() => {
        //localStorage.setItem('version', version);

        let url = new URL(window.location.href);
        window.addEventListener('scroll', checkPosition);
        if (url.search) {
            getBooks();
            setSearch(url.searchParams.get('search') || "")
        }
    }, [])

    const searchData: searchType = {
        handleChangeInput,
        handleKeyDown,
        searchBook,
        search
    }

    return (
        <>
            <Head>
                <title>Books</title>
            </Head>
            <div className="py-5">
                <div className="flex justify-between mb-3 items-center">
                    <Languages getBooks={getBooks}/>
                    <Search searchData={searchData}/>
                </div>
                <BooksList allBooks={allBooks}/>
            </div>
            <UpButton/>
        </>
    )
}

export default Books;
