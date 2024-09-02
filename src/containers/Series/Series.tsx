import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { MoveLeft, MoveRight } from 'lucide-react';

import Response from '@/classes/Response';
import Pagination from '@/classes/Pagination';

import IPagination from '@/models/Pagination';
import { ISeries } from '@/models/Series';

import Button from '@/components/Button';
import Skeleton from '@/components/Skeleton';

interface ISeriosProps {
  queryKey: string;
  children: (item: ISeries) => React.ReactElement;
  callback: (id: string, filtes: IPagination) => Promise<Response<Pagination<ISeries>>>;
}

const Series: React.FC<ISeriosProps> = ({ queryKey, callback, children }) => {
  const { id } = useParams();

  const [page, setPage] = useState<number>(0)
  const [filters, setFilters] = useState<IPagination>({ offset: 0, limit: 6 })

  const { data: series, isLoading } = useQuery([queryKey, id, page], async () => {
    const { data } = await callback(id as string, filters)
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

  const getComicsList = (): React.ReactElement => {
    if (isLoading) {
      return <div className='grid grid-cols-2 max-sm:grid-cols-1'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="grid grid-cols-6 gap-5">
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
    if (series && series.length) {
      return (
        <div className='grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
          {series.map(children)}
        </div>
      )
    }
    return (
      <div className="w-full h-40 ">
        <p className="font-bangers text-xl text-black">Não há series a serem exibidas</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 grid-rows[1fr, 0px] min-h-[calc(100vh-257px)]'>
      {getComicsList()}
      <div className='col-span-6 flex mt-4 justify-end items-end gap-4 max-sm:flex-col'>
        <Button
          label='Pagina Anterior'
          iconLeft={<MoveLeft />}
          onClick={handleBackPage}
          className='h-8 text-sm p-10'
          disabled={isLoading || !series?.length}
        />
        <Button
          label='Proxima pagina'
          onClick={handleNextPage}
          iconRight={<MoveRight />}
          className='h-8 text-sm p-10'
          disabled={isLoading || !series?.length}
        />
      </div>
    </div>
  )
}

export default Series

