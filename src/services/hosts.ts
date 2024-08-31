import api from '@/core/api';
import Response from '@/classes/Response';
import Pagination from '@/classes/Pagination';

import IPagination from '@/models/Pagination';
import { ICharacters } from '@/models/Characters';


export const getAllCharacters = async (params: IPagination): Promise<Response<Pagination<ICharacters>>> => {
  try {
    const { status, data } = await api.get('/public/characters', {params: {...params}});
    const { results, ...pagination} = data.data;
    return new Response(
      status,
      Pagination.fromJson(pagination, results),
    );
  } catch (e) {
    console.log("service error createEmailHost", e)
    throw Response.fromException(e);
  }
};
