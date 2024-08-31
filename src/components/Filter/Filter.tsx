import React from 'react';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

interface IFilter {
    onUpdateFilter: (character?: string) => void
}

const Filter: React.FC<IFilter> = ({ onUpdateFilter }) => {

    const onHandleChange = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = String(event.target.value).toLocaleLowerCase() || undefined;
            onUpdateFilter(value)
        },
        1000
    );

    return (
        <div className='flex w-80 relative max-sm:w-full'>
            <input
                onChange={onHandleChange}
                placeholder='Informe o personagem'
                className='bg-transparent h-12 border-2 rounded border-red-700 pl-10 w-full text-1xl text-black placeholder-black font-bangers'
            />
            <Search className='w-6 h-6 absolute left-2 top-3 text-red-700' />
        </div>
    )
}

export default Filter