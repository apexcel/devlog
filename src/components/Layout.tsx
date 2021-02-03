import React, { useEffect } from "react";
import GlobalHeader from '../components/GlobalHeader.tsx';
import LayoutFooter from "./layout/LayoutFooter";
import InfoFloater from "./InfoFloater.tsx";

type LayoutProps = {
    location: Record<string | number, any>
    title: string
    isPost: boolean
    children: any
};

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
    const rootPath = `/`;
    const isRootPath = location.pathname === rootPath;

    return (
        <>
            <GlobalHeader />
            <section id='layout' data-is-root-path={isRootPath}>
                {/* <div className='floater'>
                    <InfoFloater />
                </div> */}
                <main id='main'>
                    {children}
                </main>
            </section>
            <LayoutFooter />
        </>
    )
};

export default Layout