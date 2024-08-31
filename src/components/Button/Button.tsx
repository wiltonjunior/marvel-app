import React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
}

const Button: React.FC<IButtonProps> = ({ label, iconRight, iconLeft, ...props }) => {
    return (
        <button {...props} className='bg-red-700 hover:bg-red-800 font-bangers text-white px-6 py-3 text-2xl border-2 border-black flex items-center gap-1 shadow-1md  disabled:opacity-50 max-sm:w-full max-sm:justify-center'>
            {iconLeft}
            {label}
            {iconRight}
        </button>
    )
}

export default Button