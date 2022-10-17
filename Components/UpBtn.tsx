import {useEffect, useState} from "react";
import smoothscroll from 'smoothscroll-polyfill';

const UpButton = () => {
    const [isBtnVisibility, setIsBtnVisibility] = useState<boolean>(false);

    const goUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        smoothscroll.polyfill();
    }


    const scrollChange = () => {
        let scrolled = window.scrollY;
        let coords = document.documentElement.clientHeight;

        setIsBtnVisibility(scrolled > coords)
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollChange);
        return () => window.removeEventListener('scroll', scrollChange);
    }, [])

    return (
        <div className={`${isBtnVisibility ? "block" : "hidden"} hover:border-blue-purple hover:text-blue-purple w-12 
        h-12 rounded-full border-2 border-blue-light text-blue-light fixed right-4 xm:right-1/2 bottom-14 
        xm:translate-x-144 cursor-pointer transition-all`}
             onClick={goUp}>
            <svg width="26"
                 height="13"
                 viewBox="0 0 26 13"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <path d="M1.44531 11.9996L13.0009 1.77734L24.5564 11.9996" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round"/>
            </svg>
        </div>
    )
}

export default UpButton;