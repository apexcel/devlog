import React from "react";
import styled from "styled-components";
import LayoutFooter from "./LayoutFooter";
import LayoutHeader from "./LayoutHeader";

type LayoutProps = {
    location: Record<string | number, any>
    postTitle?: string
    siteTitle: string
    children: any
};

const Template = styled.div`
`;

const LayoutWrapper = styled.div`
    position: relative;
    display: block;
    height: 100%;
    min-height: 100vh;
    padding: 54px;
    width: 878px;
    margin: 0 auto;
    background-color: #ffffff;
    border: 1px solid #c4c4c4;
    box-shadow: 0px 0px 4px 2px #c0c0c0;
    z-index: 9;

    @media screen and (max-width: 893px) {
        padding: 12px;
        width: 100%;
    }
`;

const MainLayout = styled.main`
    margin-top: 100px;
`;

const LayoutTemplate: React.FC<LayoutProps> = ({ location, children, siteTitle, postTitle }) => {
    const rootPath = `/`;
    const isRootPath = location.pathname === rootPath;
    return (
        <>
            <LayoutHeader siteTitle={siteTitle} postTitle={postTitle}/>
            <LayoutWrapper data-is-root-path={isRootPath}>
                <MainLayout>
                    {children}
                </MainLayout>
            </LayoutWrapper>
            <LayoutFooter />
        </>
    )
};

export default LayoutTemplate;