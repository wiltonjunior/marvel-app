import React from 'react';

import { IComics } from '@/models/Comics';

interface ICard {
    item: IComics;
}

const Card: React.FC<ICard> = ({ item }) => {

    const getPrice = () => {
        const { prices } = item;
        if (Array.isArray(prices)) {
            const value = prices.find(price => price.type === 'printPrice');
            return value?.price;
        }
        return '-'
    }

    const getUrl = () => {
        const { urls } = item;
        if (Array.isArray(urls)) {
            const value = urls.find(url => url.type === 'detail');
            return value?.url;
        }
        return '-'
    }

    const getDate = () => {
        const data = new Date(item.modified);
        return data.toLocaleDateString("pt-br")
    }

    return (
        <div className='grid grid-cols-6 gap-4'>
              <div className='col-span-2'>
                    <img className='border-2 border-black  h-44' src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.ean} />
                </div>
                <div className='font-bangers col-span-4' >
                    <div>
                        <h4 className='text-md mb-3'>{item.title}</h4>
                        <p className='text-gray-600'>Páginas: {item.pageCount}</p>
                        <p className='text-gray-600'>Criado: {getDate()}</p>
                        <p className='text-gray-600'>Valor: $ {getPrice()}</p>
                        <a href={getUrl()} className='block mt-3 text-red-600' target='_blank'>Detalhes</a>
                    </div>
                </div>
        </div>
    )
}

export default Card