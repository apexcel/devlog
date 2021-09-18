import { css } from 'styled-components'

const tableStyle = css`
table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--default-color);

    thead {
        border-bottom: 1px solid var(--default-color);
    }

    tbody {
        tr {
            &:hover {
                opacity: 0.8;
            }

            &:nth-child(even) {
                color: var(--default-color);
                background-color: #767676;
            }

            &:nth-child(odd) {
            }
            border-left: 1px solid var(--default-color);
        }
    }

    th, td {
        padding: 12px;
        border-left: 1px solid var(--default-color);
    }
}
`;

export default tableStyle;