

export type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

export type ErrorType = {
        message: string,
        field: string

}



export enum ETest{}

export type TTest = {}

export interface ITest{}

export class Test{}