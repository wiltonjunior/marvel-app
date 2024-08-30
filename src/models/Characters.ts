import { IUrl } from "./Url";

export interface IInformationCharacterItem{
    name: string;
    type?: string;
    resourceURI: string;
}

export interface IInformationCharacters{
    returned: number;
    available: number;
    collectionURI: string;
    items: IInformationCharacterItem[]
}

export interface ICharacters{
    id: string;
    name: string;
    modified: string;
    description: string;
    resourceURI: string;
    comics: IInformationCharacters;
    series: IInformationCharacters;
    stories: IInformationCharacters;
    thumbnail: { 
        path: string;
        extension: string;
    }
    urls: IUrl[]
}