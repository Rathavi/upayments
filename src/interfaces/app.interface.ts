export interface product {
    id: string,
    name : string,
    price : number,
    category : string,
    description : string,
    avatar : string,
    developerEmail : string,
    createdAt: number
}
  
export interface category {
    id: string,
    name: string,
    createdAt: string,
    selected: boolean
}