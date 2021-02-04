import React from 'react'

interface TaggedPostsInfo {
	tagValue: string
	totalCount: number
}
const TaggedPostsInfo: React.FC<TaggedPostsInfo> = ({ tagValue, totalCount }) => {
	return (
		<div>
			<h1>Tag: {tagValue}</h1>
			<span>Total: {totalCount}</span>
		</div>
	)
};

export default TaggedPostsInfo;