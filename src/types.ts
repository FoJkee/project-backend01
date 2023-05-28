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
    errorsMessages: [{
        message:any,
        field: any
    }]
}


export enum ETest {}


export interface ITest {
}

export class Test {
}