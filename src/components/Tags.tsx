import React from 'react'

type Tag = {
    tag: string
    href: string
}

type Tags = {
    tags: Array<string>
}

const Tag: React.FC<Tag> = ({ tag, href }) => {
    return (<a href={`${href ? href : ''}`} className='tag'>{tag}</a>)
};

const Tags: React.FC<Tags> = ({ tags }) => {

    if (tags && Array.isArray(tags)) {
        const tagAnchors = tags.sort().map((tag, i) => <Tag key={i} tag={tag} href={`/tags/${encodeURI(tag)}`} />)
        return (
            <div className='tag-wrapper'>
                {tagAnchors}
            </div>
        )
    }
    return <div></div>;
};



export default Tags;