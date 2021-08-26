import React, { useRef, useMemo } from 'react'
import styled from 'styled-components';
import useEmphasizer from '../../hooks/useEmphasizer';
import useFloating from '../../hooks/useFloating';

const TOCPositioner = styled.div`
    position: relative;
    margint-top: 2rem;

    .floating {
        position: fixed;
        top: 154px;
    }

    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const TOCWrapper = styled.div`
    position: absolute;
    left: 100%;
    margin-top: 154px;
    margin-left: 30px;

    & li {
        list-style: none;
        a {
            display: block;
            font-size: 0.8rem;
            color: ${props => props.theme.colors.default};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        p {
            margin: 0;
        }
        .active {
            color: ${props => props.theme.colors.signature};
            font-weight: bold;
            font-size: 1rem;
        }
    }

    & ul {
        padding: 2px;
        margin-left: 14px;
    }
`;

const TOC: React.FC<Record<string, any>> = ({ toc }) => {
    const positionerRef = useRef<HTMLDivElement>(null);
    const tocNavRef = useRef<HTMLElement>(null);
    const tocElement = useMemo(() => toc.replace(/<p>|<\/p>/g, ''), [toc]);

    useFloating(positionerRef, tocNavRef);
    useEmphasizer();

    return (
        <TOCPositioner ref={positionerRef}>
            <TOCWrapper>
                <nav
                    ref={tocNavRef}
                    dangerouslySetInnerHTML={{ __html: tocElement }}>
                </nav>
            </TOCWrapper>
        </TOCPositioner>
    )
}

export default React.memo(TOC);