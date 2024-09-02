import { useState } from 'react'
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import { MoveLeft, MoveRight } from 'lucide-react'

import { ICharacters, IFilterCharacters } from '@/models/Characters'

import Filter from '@/components/Filter'
import Button from '@/components/Button'
import Skeleton from '@/components/Skeleton'

import Character from '@/containers/Character'

import { getAllCharacters } from '@/services/characters'
import { useCharactersStore } from '@/store/characters.store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setCharacters } = useCharactersStore()

  const [page, setPage] = useState<number>(0)
  const [filters, setFilters] = useState<IFilterCharacters>({ offset: 0, limit: 20 })

  const { nameStartsWith = '' } = filters;

  const { data: results, isLoading } = useQuery(["getAllCharacters", `${page}-${nameStartsWith}`], async () => {
    const { data } = await getAllCharacters(filters)
    return data?.results;
  }, {
    refetchOnWindowFocus: false,
  });

  const onUpdateFilter = (filters: IFilterCharacters) => {
    setPage(1);
    setFilters(JSON.parse(JSON.stringify({ ...filters, offset: 0 })))
  }

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

  const setCharactersInStore = (characters: ICharacters): void => {
    setCharacters(characters);
    navigate(`/detail/${characters.id}`);
  }

  const getComponent = (): React.ReactElement => {
    if (isLoading) {
      return <div className='flex flex-wrap gap-4 justify-between'>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="w-64 h-64 bg-slate-100" />
          </div>
        ))}
      </div>
    }
    if (results && results.length) {
      return <div className='flex flex-wrap gap-4 justify-between'>
        {results.map(item => {
          return (
            <Character
              key={item.id}
              name={item.name}
              onClick={() => setCharactersInStore(item)}
              image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
            />)
        })
        }
      </div>
    }
    return <div className="w-full h-40 flex items-center justify-center min-h-[calc(100vh-392px)]">
      <p className="font-bangers text-xl text-black">Não há personagens a serem carregados</p>
    </div>
  }

  return (
    <div className='m-auto mb-10'>
      <div className='flex my-5 gap-4 justify-between items-center max-sm:flex-col'>
        <h1 className='font-bangers text-3xl'>Super-Heróis da Marvel</h1>
        <Filter onUpdateFilter={(nameStartsWith?: string) => onUpdateFilter({ ...filters, nameStartsWith })} />
      </div>
      {getComponent()}
      <div className='flex justify-between items-center mt-10 gap-4 max-sm:flex-col'>
        <Button disabled={isLoading || !results?.length} label='Pagina Anterior' onClick={handleBackPage} iconLeft={<MoveLeft />} />
        <Button disabled={isLoading || !results?.length} label='Proxima pagina' onClick={handleNextPage} iconRight={<MoveRight />} />
      </div>
    </div>
  )
}

export default Home
