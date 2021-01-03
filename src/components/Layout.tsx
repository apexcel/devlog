import React from "react";
import { Link } from "gatsby";
import GlobalHeader from '../components/GlobalHeader.tsx'
import HeadingNavigation from "../components/HeadingNavigation.tsx"

type LayoutProps = {
    location: Record<string | number, any>,
    title: string,
    isPost: boolean,
    children: any
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
    const rootPath = `/`;
    const isRootPath = location.pathname === rootPath;
    let header

    if (isRootPath) {
        header = (
            <h1 className="main-heading">
                <Link to="/">{title}</Link>
            </h1>
        )
    } else {
        header = (
            <Link className="header-link-home" to="/">
                {title}
            </Link>
        )
    }

    return (
        <div className='global-wrapper'>
            <GlobalHeader />
            <div className='layout-wrapper' data-is-root-path={isRootPath}>
                <main className='main-wrapper' data-is-root-path={isRootPath}>{children}</main>
            </div>
            <footer className='global-footer'>
                <a href="">깃허브</a>
            </footer>
        </div>
    )
}

export default Layout