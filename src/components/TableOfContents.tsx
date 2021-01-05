import React, { useEffect } from 'react'

type DataType = {
    [key: string]: any
}

const TableOfContents: React.FC<DataType> = ({ toc }) => {

    const renderTableOfContents = () => {
        const tocHeadings = toc.replace(/(<a)\b/g, `<a class='toc-headings'`);
        return <nav className='toc-list' dangerouslySetInnerHTML={{ __html: tocHeadings }} />
    };

    return (
        <div className='toc-wrapper'>
            {renderTableOfContents()}
        </div>
    )
}

export default TableOfContents;