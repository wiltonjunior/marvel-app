import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { ICharacters } from '@/models/Characters';
import { getCharactersById } from '@/services/characters'

import Comics from '@/containers/Comics';
import Skeleton from '@/components/Skeleton';

const Detail: React.FC = () => {

  const { id } = useParams();
  const { data: result, isLoading } = useQuery(["getCharactersById", id], async () => {
    const { data } = await getCharactersById(id as string)
    return data as ICharacters
  }, {
    refetchOnWindowFocus: false,
  });

  const getComponent = (): React.ReactElement => {
    if (isLoading) {
      return <Skeleton className="w-full h-full bg-slate-100" />
    }
    return (
      <div className='h-full border-2 border-black bg-black mb-4'>
        <figure className="relative">
          <div className="transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
            <img className='w-full' src={`${result?.thumbnail.path}.${result?.thumbnail.extension}`} alt="personagem" />
          </div>
          <div className=' py-4 w-full  bottom-0 flex items-center justify-center'>
            <figcaption className="px-4 text-xl text-white font-bangers">
              {result?.description || "-"}
            </figcaption>
          </div>
        </figure>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-5 gap-10 my-10'>
      <div className='col-span-2 h-[max-content]'>
        <h2 className='font-bangers text-2xl mb-2'>{result?.name}</h2>
        {getComponent()}
      </div>
      <div className='col-span-3 h-[max-content]'>
        <Comics />
      </div>
    </div>
  )
}

export default Detail

