import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import IPagination from '@/models/Pagination';
import { ICharacters } from '@/models/Characters';
import { getCharactersById, getComicsByCharacters } from '@/services/characters'

import Comics from '@/containers/Comics';
import Skeleton from '@/components/Skeleton';
import Button from '@/components/Button';
import { MoveLeft, MoveRight } from 'lucide-react';

const Detail: React.FC = () => {

  const { id } = useParams();
  const [page, setPage] = useState<number>(0)
  const [filters, setFilters] = useState<IPagination>({ offset: 0, limit: 6 })

  const { data: character, isLoading: isLoadingCharacter } = useQuery(["getCharactersById", id], async () => {
    const { data } = await getCharactersById(id as string)
    return data as ICharacters
  }, {
    refetchOnWindowFocus: false,
  });

  const { data: comics, isLoading: isLoadingComics } = useQuery(["getComicsByCharacters", id, page], async () => {
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

  const getPictureComponentWithDescription = (): React.ReactElement => {
    if (isLoadingCharacter) {
      return <Skeleton className="w-full h-full bg-slate-100" />
    }
    return (
      <div className='h-full border-2 border-black bg-black mb-4'>
        <figure className="relative">
          <div className="transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
            <img className='w-full h-full' src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`} alt="personagem" />
          </div>
          <div className='w-full flex items-center justify-center'>
            <figcaption className="p-2 text-xl text-white font-bangers">
              {character?.description || "-"}
            </figcaption>
          </div>
        </figure>
      </div>
    )
  }

  const getComicsList = (): React.ReactElement => {
    if (isLoadingComics) {
      return <div className='grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
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
    if (comics && comics.length) {
      return <div className='grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
        {comics.map(item => <Comics key={item.id} item={item} />)}
      </div>
    }
    return <div className="w-full h-40 ">
      <p className="font-bangers text-xl text-black">Não há personagens a serem carregados</p>
    </div>
  }


  return (
    <div className='grid grid-cols-5 grid-rows-[1fr, 50px] gap-x-10 my-10 max-sm:flex max-sm:flex-col'>
      <div className='col-span-2'>
        <h2 className='font-bangers text-2xl mb-2'>{character?.name}</h2>
        {getPictureComponentWithDescription()}
      </div>
      <div className='row-span-1 col-span-3'>
        <h2 className='font-bangers text-2xl mb-2'>Quadrinhos</h2>
        {getComicsList()}
      </div>
      <div className='col-span-6 flex mt-4 justify-end items-center gap-4 max-sm:flex-col'>
        <Button
          label='Pagina Anterior'
          iconLeft={<MoveLeft />}
          onClick={handleBackPage}
          className='h-8 text-sm p-10'
          disabled={isLoadingComics || !comics?.length}
        />
        <Button
          label='Proxima pagina'
          onClick={handleNextPage}
          iconRight={<MoveRight />}
          className='h-8 text-sm p-10'
          disabled={isLoadingComics || !comics?.length}
        />
      </div>
    </div>
  )
}

export default Detail

