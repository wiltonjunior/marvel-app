export interface IInformationDetailItem{
    name: string;
    type?: string;
    resourceURI: string;
}

export interface IInformationDetail{
    returned: number;
    available: number;
    collectionURI: string;
    items: IInformationDetailItem[]
}
