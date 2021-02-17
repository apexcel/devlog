import { css } from 'styled-components'
import COLORS from './colors.style';

const PostTableStyle = css`
table {
    display: block;
    border-collapse: collapse;
    // overflow-x: auto;
    text-align: left;

    thead {
        display: block;
        tr {
            display: flex;
        }
        th {
            flex-basis: 0;
            flex-grow: 1;
            width: 100%;
            border-bottom: 2px solid ${COLORS.MAIN};
            padding: 10px 0;
        }
    }

    tbody {
        display: table;
        table-layout: fixed;
        width: 100%;
        
        tr {
            &:hover {
                opacity: 0.8;
            }

            &:nth-child(even) {
                background-color: ${COLORS.TABLE_BG};
                border-bottom: 1px solid ${COLORS.TABLE_BORDER};
            }

            &:nth-child(odd) {
                border-bottom: 1px solid ${COLORS.TABLE_BORDER};
            }
        }

        td {
            padding: 10px 0;
            white-space: nowrap;
            overflow: auto;
            word-break: break-all;
        }
    }
}
`;

export default PostTableStyle;