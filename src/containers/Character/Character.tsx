import React from 'react';

interface ICharacter {
    name: string;
    image: string;
}

const Character: React.FC<ICharacter> = ({ name, image }) => {
    return (
        <div className='w-64 h-64 relative border-2 border-black shadow-1md cursor-pointer overflow-hidden  max-sm:w-full'>
            <img className='w-full h-full transform  hover:scale-105' src={image} alt={name} />
            <div className=' bg-white font-bangers border-2 border-black text-black text-lg px-2 py-1 border-spacing-1 -bottom-1 -right-[5px] transform -skew-x-12 absolute' >
                {name}
            </div>
        </div>
    )
}

export default Character