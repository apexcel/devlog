import React from 'react'
import styled from 'styled-components';


const WrittenDate = styled.span`
    display: inline-block,
    color: #919191;
    marginTop: 12px;

    @media screen and (max-width: 768px) {
        width: 130px;
        font-size: 0.7rem;
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
        <WrittenDate>
            {written}
        </WrittenDate>
    )
};

export default PostWrittenDate;