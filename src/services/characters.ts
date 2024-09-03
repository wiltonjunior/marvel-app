import api from '@/core/api';
import Response from '@/classes/Response';
import Pagination from '@/classes/Pagination';

import IPagination from '@/models/Pagination';
import { IComics } from '@/models/Comics';
import { ISeries } from '@/models/Series';
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
    console.log("ERROR !")
    // console.log("service error createEmailHost", e)
    throw Response.fromException(e);
  }
};


export const getCharactersById = async (id: string): Promise<Response<ICharacters>> => {
  try {
    const { status, data } = await api.get(`/public/characters/${id}`);
    const { results } = data.data;
    return new Response( status, results[0]);
  } catch (e) {
    console.log("service error createEmailHost", e)
    throw Response.fromException(e);
  }
};

export const getComicsByCharacters = async (id: string,  params: IPagination):  Promise<Response<Pagination<IComics>>> => {
  try {
    const { status, data } = await api.get(`/public/characters/${id}/comics`, {params: {...params}});
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

export const getSeriesByCharacters = async (id: string,  params: IPagination):  Promise<Response<Pagination<ISeries>>> => {
  try {
    const { status, data } = await api.get(`/public/characters/${id}/series`, {params: {...params}});
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

export const getEventsByCharacters = async (id: string,  params: IPagination):  Promise<Response<Pagination<IComics>>> => {
  try {
    const { status, data } = await api.get(`/public/characters/${id}/events`, {params: {...params}});
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





