import React from 'react';

import { ISeries } from '@/models/Series';

interface ISeriesDetailProps {
    series: ISeries;
}

const SeriesDetail: React.FC<ISeriesDetailProps> = ({ series }) => {

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
        <div key={series.id} className='grid grid-cols-7 gap-4'>
            <div className='col-span-3'>
                <img className='border-2 border-black h-48 w-full' src={`${series.thumbnail.path}.${series.thumbnail.extension}`} alt={series.ean} />
            </div>
            <div className='font-bangers col-span-4' >
                <div>
                    <h4 className='text-md mb-3'>{series.title}</h4>
                    <p className='text-gray-600'>Criado: {getDate()}</p>
                    <a href={getUrl()} className='block mt-3 text-red-600' target='_blank'>Detalhes</a>
                </div>
            </div>
        </div>
    )
}

export default SeriesDetail