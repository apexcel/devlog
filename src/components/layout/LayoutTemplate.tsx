import React from "react";
import styled from "styled-components";
import LayoutFooter from "./LayoutFooter";
import LayoutHeader from "./LayoutHeader";

type LayoutProps = {
    location: Record<string | number, any>
    title: string
    children: any
};

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

    @media screen and (max-width: 768px) {
        padding: 12px;
        width: 100%;
    }
`;

const MainLayout = styled.main`
    display: flex;
    margin-top: 100px;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

const LayoutTemplate: React.FC<LayoutProps> = ({ location, children }) => {
    const rootPath = `/`;
    const isRootPath = location.pathname === rootPath;

    return (
        <>
            <LayoutHeader />
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