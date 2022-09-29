import React, {FC} from "react";
import {bookType} from "../types";
import Image from "next/image";

type bookInfoProps = {
    book: bookType,
}

const BookInfo: FC<bookInfoProps> = ({book}) => {
    const {title, authors, download_count, formats, subjects} = book || {};
    return (
        <div className="flex py-19 gap-x-20 py-10">
            <div className="basis-2/5 text-end">
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