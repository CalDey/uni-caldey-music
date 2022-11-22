import { http, config } from '../config';
import { Song, SongUrl, Lyric } from '../models/song'

// 获取音乐url
export async function getSongUrl(id: number) {
    const { data } = await http.get<{ data: SongUrl[] }>( config.baseUrl + 'song/url', {
        id: id,
    });
    return data[0];
}

// 获取歌曲详情
export async function getSongDetail(id: number) {
    const { songs } = await http.get<{ songs: Song[] }>( config.baseUrl + 'song/detail', {
        ids: id,
    });
    return songs[0];
}

// 获取歌曲歌词
export async function getSongLyric(id: number) {
    const { lrc } = await http.get<{ lrc: Lyric[] }>(config.baseUrl + 'lyric', { id });
    return lrc;
}