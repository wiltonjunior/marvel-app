import React from 'react';
import { Link } from "react-router-dom";

import Container from '@/components/Container';

import Marvel from "@/assets/m.svg";

const Footer: React.FC = () => {
    return (
        <div className='bg-[#202020] h-20 flex items-center'>
            <Container>
                <div className='flex items-center justify-end'>
                    <div className='w-10'>
                        <Link to="/">
                            <Marvel />
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer