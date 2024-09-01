import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { getComicsByCharacters } from '@/services/characters'

import Skeleton from '@/components/Skeleton';
import IPagination from '@/models/Pagination';

import Card from './components/Card';
import { MoveLeft, MoveRight } from 'lucide-react';
import Button from '@/components/Button';


const Comics: React.FC = () => {

  const { id } = useParams();
  const [page, setPage] = useState<number>(0)
  const [filters, setFilters] = useState<IPagination>({ offset: 0, limit: 6 })

  const { data: results, isLoading } = useQuery(["getComicsByCharacters", id , page], async () => {
    const { data } = await getComicsByCharacters(id as string, filters)
    return data?.results;
  }, {
    refetchOnWindowFocus: false,
  });

  const onUpdatePagination = (page: number) => {
    const { limit } = filters
    setFilters({ ...filters, offset: limit * page })
  }

  const handleNextPage = () => {
    const value = page + 1;
    setPage(value)
    onUpdatePagination(value);
  }

  const handleBackPage = () => {
    const value = page - 1;
    if (value >= 0) {
      setPage(value)
      onUpdatePagination(value);
    }
  }

  const getComponent = (): React.ReactElement => {
    if (isLoading) {
      return <div className='grid grid-cols-2 gap-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="grid grid-cols-6 gap-4">
            <div className='col-span-2'>
              <Skeleton className="w-full h-44 bg-slate-100" />
            </div>
            <div className='col-span-4 gap-4'>
              <Skeleton className="w-52 h-4 mb-3 bg-slate-100" />
              <Skeleton className="w-40 h-4 mb-3 bg-slate-100" />
              <Skeleton className="w-20 h-4 mb-3 bg-slate-100" />
              <Skeleton className="w-48 h-4 mb-3 bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    }
    if (results && results.length) {
      return <div className='grid grid-cols-2 gap-4'>
        {results.map(item => <Card key={item.id} item={item} />)}
      </div>
    }
    return <div className="w-full h-40 ">
      <p className="font-bangers text-xl text-black">Não há personagens a serem carregados</p>
    </div>
  }

  return (
    <div className='overflow h-[inherit]'>
      <h2 className='font-bangers text-2xl mb-2'>Quadrinhos</h2>
      <div className='overflow-auto h-auto'>
        {getComponent()}
      </div>
      <div className='flex mt-4 justify-end items-center gap-4 max-sm:flex-col'>
        <Button
          label='Pagina Anterior'
          iconLeft={<MoveLeft />}
          onClick={handleBackPage}
          className='h-8 text-sm p-10'
          disabled={isLoading || !results?.length}
        />
        <Button
          label='Proxima pagina'
          onClick={handleNextPage}
          iconRight={<MoveRight />}
          className='h-8 text-sm p-10'
          disabled={isLoading || !results?.length}
        />
      </div>
    </div>
  )
}

export default Comics