import React from 'react'

type DataType = {
	[key: string]: any
}

const HeadingNavigation: React.FC<DataType> = ({ data }) => {




    const renderHeadings = () => {
    const headings = (data.markdownRemark.headings);
        return (headings.map((v, i) =>
            <li key={i} className='heading-list' data-depth={v.depth}>
                {v.value}
            </li>
        ));
    };

    return (
        <div className='heading-navigation-wrapper'>
            <nav>
                <ul className='heading-list-wrapper'>
                    {renderHeadings()}
                </ul>
            </nav>
        </div>
    )
}

export default HeadingNavigation;