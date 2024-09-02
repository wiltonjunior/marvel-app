import React from 'react';

import { ISeries } from '@/models/Series';

interface IComicDetailProps {
    series: ISeries;
}

const ComicDetail: React.FC<IComicDetailProps> = ({ series }) => {

    const getPrice = () => {
        const { prices } = series;
        if (Array.isArray(prices)) {
            const value = prices.find(price => price.type === 'printPrice');
            return value?.price;
        }
        return '-'
    }

    const getUrl = () => {
        const { urls } = series;
        if (Array.isArray(urls)) {
            const value = urls.find(url => url.type === 'detail');
            return value?.url;
        }
        return '-'
    }

    const getDate = () => {
        const data = new Date(series.modified);
        return data.toLocaleDateString("pt-br")
    }

    return (
        <div className='grid grid-cols-7 gap-4'>
            <div className='col-span-3'>
                <img className='border-2 border-black h-48 w-full' src={`${series.thumbnail.path}.${series.thumbnail.extension}`} alt={series.ean} />
            </div>
            <div className='font-bangers col-span-4' >
                <div>
                    <h4 className='text-md mb-3'>{series.title}</h4>
                    <p className='text-gray-600'>Páginas: {series.pageCount}</p>
                    <p className='text-gray-600'>Criado: {getDate()}</p>
                    <p className='text-gray-600'>Valor: $ {getPrice()}</p>
                    <a href={getUrl()} className='block mt-3 text-red-600' target='_blank'>Detalhes</a>
                </div>
            </div>
        </div>
    )
}

export default ComicDetail