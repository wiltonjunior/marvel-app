
import React from 'react';

import Header from '@/containers/Header'
import Footer from '@/containers/Footer'

import Container from '@/components/Container'

interface ILayoutProps {
    children: React.ReactElement
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <div className='w-full'>
            <Header />
            <Container>
                <div className='w-full min-h-[calc(100vh-184px)]'>
                    {children}
                </div>
            </Container>
            <Footer />
        </div>
    )
}



export default Layout