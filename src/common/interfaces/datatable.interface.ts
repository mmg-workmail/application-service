export interface DatatableResponse<T>{
    total : number,
    items: T[],
    page : number,
    limit: number
}



export interface QueryParam {
    skip : number;
    take: number;
    order: Order,
    where : {
        [key : string] : any
    }
}
export interface Order {
    [key: string] : OrderType
}
export enum OrderType {
    ASK = 'ASK',
    DESC = 'DESC'
}
export enum Operator {
    EQUAL = 'equal',
    LIKE = 'like' 
}

export enum Type {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}