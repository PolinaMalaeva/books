import React, {FC} from "react";
import {useRouter} from "next/router";

type languages = {
    getBooks: () => void
}

const Languages: FC<languages> = ({getBooks}) => {
    const router = useRouter();

    const languagesSection = [
        {
            id: "en",
            label: "English"
        },
        {
            id: "fr",
            label: "France"
        },
        {
            id: "de",
            label: "Deutsche"
        },
    ]

    const choiceLanguage = (e: React.MouseEvent<HTMLInputElement>, id: string) => {
        let url = new URL(window.location.href);
        url.searchParams.set('page', '1');
        let language = url.searchParams.get('languages');
        let languageArray = language ? language.split(',') : [];

        if ((e.target as HTMLInputElement).checked) {
            languageArray.push(id);
            url.searchParams.set('languages', languageArray.join(','));
        } else {
            let myIndex = languageArray.indexOf(id);

            if (myIndex !== -1) {
                languageArray.splice(myIndex, 1);

                if (languageArray.length === 0) {
                    url.searchParams.delete('languages');
                } else {
                    url.searchParams.set('languages', languageArray.join(','));
                }
            }
        }

        history.pushState({}, '', url.search || '?');
        getBooks();
    }

    return (
        <div>
            <p className="font-bold mb-3">Languages</p>
            <div className="flex space-x-2.5">
                {languagesSection && languagesSection.map(({id, label}, index) => (
                    <section key={index}>
                        <input className="language w-5 h-5 mr-1.5 align-top rounded-none"
                               type="checkbox"
                               defaultChecked={(router.query.languages?.includes(id))}
                               value=""
                               id={id}
                               onClick={(e) => choiceLanguage(e, id)}/>
                        <label className=""
                               htmlFor="eng">
                            {label}
                        </label>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default Languages;