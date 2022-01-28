import React from 'react'
import styled from 'styled-components';


const WrittenDate = styled.time`
    display: inline-block;
    flex: 0 0 auto;
    color: #4a4a4a;
    padding-left: 10px;
    font-size: 14px;

    @media screen and (max-width: 768px) {
        font-size: 12px;
    }
`;

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
        <WrittenDate dateTime={`${year}/${month}/${dayOfMonth}`}>
            {written}
        </WrittenDate>
    )
};

export default PostWrittenDate;