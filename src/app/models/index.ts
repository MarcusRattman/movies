export interface IMovie {
    id: number,
    name: string,
    year: number,
    description: string,
    genre: number[],
}

export interface IGenre {
    [id: number]: string
}