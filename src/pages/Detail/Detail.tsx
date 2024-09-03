import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
// import { useCharactersStore } from '@/store/characters.store';

import { getCharactersById, getComicsByCharacters, getSeriesByCharacters } from '@/services/characters'

import { ISeries } from '@/models/Series';
import { ICharacters } from '@/models/Characters';

import Series from '@/containers/Series';
import Skeleton from '@/components/Skeleton';
import ComicDetail from '@/containers/ComicDetail';
import SeriesDetail from '@/containers/SeriesDetail';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs';

const Detail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id)

  // const { characters } = useCharactersStore();

  const { data: characters, isLoading } = useQuery(["getCharactersById", id], async () => {
    const { data } = await getCharactersById(id as string)
    return data as ICharacters
  }, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!id) {
      navigate('/')
    }
  }, [id])

  const getPictureComponentWithDescription = (): React.ReactElement => {
    if (isLoading) {
      return <Skeleton className="w-full h-full bg-slate-100" />
    }
    return (
      <div className='border-2 relative flex flex-col border-black bg-black mb-4 min-h-[calc(100vh-257px)]'>
        <div className="transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
          <img className='w-full h-full' src={`${characters?.thumbnail.path}.${characters?.thumbnail.extension}`} alt="personagem" />
        </div>
        <div className='w-full h-full flex items-center justify-center'>
          <figcaption className="p-2 text-xl text-white font-bangers">
            {characters?.description || "-"}
          </figcaption>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-5 gap-x-10 my-5 max-sm:flex max-sm:flex-col'>
      <div className='col-span-2'>
        <h2 className='font-bangers text-2xl h-14 flex itens-center'>{characters?.name}</h2>
        {getPictureComponentWithDescription()}
      </div>
      <div className='col-span-3'>
        <Tabs defaultValue="comics">
          <TabsList className='font-bangers flex gap-4 justify-start p-0 mb-5'>
            <TabsTrigger value="comics" className="text-xl rounded-none py-1 px-4 border-2 border-black data-[state=active]:border-red-500 data-[state=active]:text-red-500">Quadrinhos</TabsTrigger>
            <TabsTrigger value="series" className="text-xl rounded-none py-1 px-4 border-2 border-black data-[state=active]:border-red-500 data-[state=active]:text-red-500">Series</TabsTrigger>
          </TabsList>
          <TabsContent value="comics">
            <Series queryKey='getComicsByCharacters' callback={getComicsByCharacters}>
              {(series: ISeries) => <ComicDetail series={series} />}
            </Series>
          </TabsContent>
          <TabsContent value="series">
            <Series queryKey='getSeriesByCharacters' callback={getSeriesByCharacters}>
              {(series: ISeries) => <SeriesDetail series={series} />}
            </Series>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Detail

