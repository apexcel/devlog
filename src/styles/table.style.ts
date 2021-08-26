import { css } from 'styled-components'

const tableStyle = css`
table {
    display: block;
    border-collapse: collapse;
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
            border-bottom: 2px solid var(--default-color);
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
                color: var(--default-color);
                background-color: #6c799c;
            }

            &:nth-child(odd) {
            }
            border-bottom: 1px solid rgba(0, 0, 0, 0.4);
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

export default tableStyle;