import React from 'react'
import styled from 'styled-components';

const FloaterPositioner = styled.div`
    position: absolute;
    display: block;
    height: auto;
    margin-top: 20px;
    border: 1px solid blue;
`;

const FloaterContents = styled.div`
    position: relative;
    left: 100px;
    border: 1px solid red;
    width: 140px;
    height: 240px;
    position: fixed;
`;

const Floater: React.FC = () => {
    return (
        <FloaterPositioner>
            <FloaterContents>
                hi
            </FloaterContents>
        </FloaterPositioner>
    )
};

export default Floater;