import React from 'react';

interface IContainerProps {
    children: React.ReactElement
}

const Container: React.FC<IContainerProps> = ({ children }) => {
    return (
        <div className='container 2xl px-4'>
            {children}
        </div>
    )
}

export default Container