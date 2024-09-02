import { IUrl } from "./Url";
import { IDate } from "./Date";
import { IImage } from "./Image";
import { IPrice } from "./Prices";
import { ISummary } from "./Summary";
import { IInformationDetail } from "./InformationDetail";

export interface ISeries{
    characters: IInformationDetail,
    collectedIssues: ISummary[],
    collections: ISummary[],
    creators: IInformationDetail,
    dates: IDate[],
    description: string,
    diamondCode: string,
    digitalId: number,
    ean:string,
    events: IInformationDetail,
    format: string,
    id: number,
    images: IImage[],
    isbn: string,
    issn: string,
    issueNumber: number,
    modified: string,
    pageCount: number,
    prices: IPrice,
    resourceURI: string;
    series: ISummary;
    stories: IInformationDetail,
    textObjects: string[],
    thumbnail: IImage,
    title: string,
    upc: string,
    urls: IUrl[],
    variantDescription: string,
    variants: ISummary[],
}