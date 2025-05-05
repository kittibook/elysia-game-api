

export interface Game {
    dataSet : number
    name : string
    age : number
    time : string
    disease : string
    score :  number
    position : Position
    gamedetail : gameDetail

}

export interface Position {
    latitude : string
    longitude : string
}

export interface Game1 {
    name : string
    time : number
    score : number
    detail : any[]
}

export interface detailGame1 {
    url : string
}

export interface Game2 {
    name : string
    time : number
    score : number
    problems : any[]
    detail : any[]
}

interface ismatchGame2 {
    color : string
    time : number
}

export interface Game3 {
    name : string
    time : number
    score : number
    problems : any[]
    detail : any[]

}

export interface Game456 {
    name : string
    time : number
    score : number
    detailproblems : any[]

}

export interface gameDetail {
    game1 : Game1
    game2 : Game2
    game3 : Game3
    game4 : Game456
    game5 : Game456
    game6 : Game456
}