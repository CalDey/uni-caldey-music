export interface HotSearch {
    hots: Hots[]
}

export interface Hots {
    first: string,
    iconType: number,
    second: number,
    third: any
}

export interface SearchSuggest {
    albums: SearchAlbums[],
    artists: SearchArtist[],
    songs: SearchSongs[],
    order: Array<string>
}

export interface SearchAlbums {
    id: number,
    name: string,
    artist: SearchArtist,
    publishTime: number,
    size: number,
    copyrightId: number,
    status: number,
    picId: number,
    mark: number
}

export interface SearchArtist {
        id: number,
        name: string,
        picUrl: string,
        alias: Array<string>,
        albumSize: number,
        picId: number,
        fansGroup: any,
        img1v1Url: string,
        img1v1: number,
        alia: Array<string>,
        trans: any
}

export interface SearchSongs {
    id: number,
    name: string,
    artists: SearchArtist[],
    album: SearchAlbums,
    duration: number,
    copyrightId: number,
    status: number,
    alias: Array<any>,
    rtype: number,
    ftype: number,
    transNames: Array<string>,
    mvid: number,
    fee: number,
    rUrl: any,
    mark: number
}