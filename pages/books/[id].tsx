import {GetServerSideProps} from "next";
import {FC, useEffect} from "react";
import Head from "next/head";
import {bookType} from "../../types";
import BookInfo from "../../Components/BookInfo";
import {setVisitedId} from "../../customFunctions/main";

export const getServerSideProps: GetServerSideProps = async (context) => {
    // @ts-ignore
    const {id} = context.params;
    const response = await fetch(`https://gutendex.com/books/${id}`);
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {book: data},
    }
};

type bookTypeProps = {
    book: bookType
}

const Book: FC<bookTypeProps> = ({book}) => {
    const {title, id} = book || {};

    useEffect(() => {
        setVisitedId(id);
    }, [])

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <BookInfo book={book}/>
        </>
    )

};

export default Book;