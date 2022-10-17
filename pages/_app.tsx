import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import Layout from "../Components/Layout";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js"></script>
            </Head>
            <Layout>
                <main className="[font-family:'Montserrat']  bg-gradient-to-r from-purple-300 to-blue-300">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <Component {...pageProps} />
                    </div>
                </main>
            </Layout>
        </>
    )
}

export default MyApp;
