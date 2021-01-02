import React from 'react'

type CategoryButtonProps = {
    title: string,
    icon?: SVGElement
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
    title,
    icon
}) => {

    return (
        <div className='btn category-btn'>
            {title}
        </div>
    )
}

export default CategoryButton;