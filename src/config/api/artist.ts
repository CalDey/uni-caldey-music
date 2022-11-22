import { http, config } from '../config';
import type { Artist, ArtistDetail, Album } from "../models/artist";
import type { Song } from '../models/song';

class Artists {
    // 歌手列表
    async getArtistList(pageData: {
        type: number;
        area: number;
        initial: string;
        page: number;
        limit: number;
    }) {
        const { artists, more } = await http.get<{ artists: Artist[], more: boolean }>(config.baseUrl + 'artist/list', {
            type: pageData.type,
            area: pageData.area,
            initial: pageData.initial,
            limit: pageData.limit,
            offset: (pageData.page - 1) * pageData.limit,
        });
        return { artists, more };
    }
    // 歌手详情
    async getArtistDetail(id: number) {
        const { data } = await http.get<{ data: ArtistDetail }>(config.baseUrl + 'artist/detail', { id });
        return data.artist;
    }
    // 歌手热门歌曲
    async getArtistHotSongs(id: number) {
        const { songs } = await http.get<{ songs: Song[] }>(config.baseUrl + 'artist/top/song', { id });
        return songs;
    }
    // 歌手专辑
    async getArtistAlbum(id: number, limit: number, offset = 0) {
        const { hotAlbums, more } = await http.get<{ hotAlbums: Album[], more: boolean }>(config.baseUrl + 'artist/album', { id, limit, offset },
        );
        return { hotAlbums, more };
    }
}

export const artist = new Artists();

