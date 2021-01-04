import React from 'react'

type DataType = {
    [key: string]: any
}

const TableOfContents: React.FC<DataType> = ({ data }) => {
    const renderTableOfContents = () => {
        const toc: string = data.markdownRemark.tableOfContents;
        return <nav className='toc-list' dangerouslySetInnerHTML={{ __html: toc }} />
    }

    return (
        <div className='toc-wrapper'>
            {renderTableOfContents()}
        </div>
    )
}

export default TableOfContents;