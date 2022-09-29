import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect} from "react";

const Error = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/books');
        }, 3000);
    }, [router]);

    return (
        <div>
            <Head>
                <title>Error</title>
            </Head>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Страница не найдена.
            </div>
        </div>
    )
};

export default Error;