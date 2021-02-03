import React from 'react'

type PostWrittenDate = {
    date: string
}
const PostWrittenDate: React.FC<PostWrittenDate> = ({ date }) => {
    const when = new Date(date);
    const dayOfMonth = when.getDate(),
        month = when.getMonth() + 1,
        year = when.getFullYear();
    
    const written = `${year}년 ${month}월 ${dayOfMonth}일`;
    return (
        <span style={{
            display: `inline-block`,
            color: `#919191`,
            marginTop: `12px`
        }}>{written}</span>
    )
};

export default PostWrittenDate;