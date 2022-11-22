import { http, config } from '../config';
import type { PlaylistHighqualityTag, PlayListDetail } from "../models/playlist";
import type { Song } from '../models/song';
import type { Album } from '../models/artist'

class PlayList {
    // 歌单tag
    async getPlayListTags() {
        const { tags } = await http.get<{ tags: PlaylistHighqualityTag[] }>(config.baseUrl + "playlist/highquality/tags")
        return tags
    }
    // 歌单列表数据
    async getTopPlaylistHighquality(params?: {
        limit?: number;
        before?: number;
        cat: string;
    }) {
        return await http.get<{
            playlists: PlayListDetail[];
            total: number;
            more: boolean;
            lasttime: number;
        }>(config.baseUrl + 'top/playlist/highquality', params);
    }
    // 歌单详情
    async getPlayListDetail(id: number) {
        const { playlist } = await http.get<{ playlist: PlayListDetail }>(config.baseUrl + 'playlist/detail', { id });
        return playlist;
    }
    // 获取歌单歌曲列表
    async getPlayListTrackAll(id: number) {
        const { songs } = await http.get<{ songs: Song[] }>(config.baseUrl + 'playlist/track/all', { id });
        return songs;
    }
    // 专辑详情
    async getAlbumDetail(id: number) {
        const { album, songs } = await http.get<{ album: Album; songs: Song[] }>(config.baseUrl + 'album', { id });
        return { album, songs };
    }
}

export const playlist = new PlayList();