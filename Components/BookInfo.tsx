import React, {FC} from "react";
import {bookType} from "../types";
import Image from "next/image";

type bookInfoProps = {
    book: bookType,
}

const BookInfo: FC<bookInfoProps> = ({book}) => {
    const {title, authors, download_count, formats, subjects} = book || {};

    return (
        <div className="lg:flex sm:block py-19 gap-x-20 py-10 relative">
            <div className="absolute lg:left-4 top-[-70px] -left-4"
                 onClick={() => window.location.pathname = '/books'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" className="w-16 h-16 stroke-gray-600 hover:stroke-gray-800 cursor-pointer">
                    <path
                        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"/>
                </svg>
            </div>
            <div className="w-max mx-auto pb-8 basis-2/5 text-end">
                <Image src={formats["image/jpeg"]}
                       alt="book"
                       width={350}
                       height={500}
                       className="w-full h-full block"/>
            </div>
            <div className="basis-3/5">
                <div className="text-2xl text-red-800 mb-1">{title}</div>
                <div>
                    {authors && authors.map(({name, birth_year, death_year}, index) => (
                        <div key={index} className="">
                            <i className="text-xl">
                                {name} (
                                <strong className="text-sm">
                                    {birth_year || "unknown"} - {death_year || "unknown"}
                                </strong>)
                            </i>
                        </div>
                    ))}
                </div>
                <div className="flex my-20 gap-2 flex-wrap">
                    {subjects && subjects.map((subject, index) => (
                        <div key={index}
                             className="bg-blue-100 p-5 rounded">{subject}</div>
                    ))}
                </div>
                <div className="mt-2 font-bold text-gray-600">
                    <strong className="text-red-800">Number of downloads:</strong> {download_count}
                </div>
            </div>
        </div>
    )

};

export default BookInfo;