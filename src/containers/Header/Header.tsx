import React from 'react';

import Container from '@/components/Container';

import Marvel from "@/assets/marvel.svg";

const Header: React.FC = () => {
    return (
        <div className='bg-[#202020]'>
            <Container>
                <div className='py-4 w-full flex justify-between items-end'>
                    <Marvel />
                </div>
            </Container>
        </div>
    )
}

export default Header