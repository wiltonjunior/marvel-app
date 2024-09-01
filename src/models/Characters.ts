import { IUrl } from "./Url";
import { IImage } from "./Image";
import { IInformationDetail } from "./InformationDetail";
import IPagination from "./Pagination";

export interface IFilterCharacters extends IPagination {
    nameStartsWith?: string
}

export interface ICharacters{
    id: string;
    name: string;
    modified: string;
    description: string;
    resourceURI: string;
    comics: IInformationDetail;
    series: IInformationDetail;
    stories: IInformationDetail;
    thumbnail: IImage,
    urls: IUrl[]
}