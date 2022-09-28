import { FC, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type layoutProps = {
    children: ReactNode,
}

const Layout:FC<layoutProps> = ({ children }) => (
    <div className="grid [grid-template-rows:auto_1fr_auto] h-full">
        <Header />
        {children}
        <Footer />
    </div>
);

export default Layout;