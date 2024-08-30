import api from '@/core/api';
import Response from '@/classes/Response';
import Pagination from '@/classes/Pagination';

import IPagination from '@/models/Pagination';
import { ICharacters } from '@/models/Characters';


export const getAllCharacters = async (pagination: IPagination): Promise<Response<Pagination<ICharacters>>> => {
  try {
    const { status, data } = await api.get('/public/characters', {params: {...pagination}});
    return new Response(
      status,
      Pagination.fromJson(data.meta.pagination, data.data),
    );
  } catch (e) {
    console.log("service error createEmailHost", e)
    throw Response.fromException(e);
  }
};
