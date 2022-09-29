import {FC, useEffect} from "react";
import {useRouter} from "next/router";

const Home: FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/books');
    }, [])

    return (
        <>
        </>
    )
}

export default Home;