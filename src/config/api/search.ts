import { http, config } from '../config'
import type { HotSearch, SearchSuggest } from '../models/search'

// 获取热门搜索
export async function getHotSearch() {
    const { result } = await http.get<{ result: HotSearch }>(config.baseUrl + 'search/hot');
    return result;
}

// 搜索建议
export async function getSearchSuggest(keywords: string) {
    const { result } = await http.get<{ result: SearchSuggest }>(config.baseUrl + 'search/suggest', { keywords });
    return result;
}

// 获取搜索结果
export async function getSearchResult(
    keywords: string,
    limit: number,
    offset = 0,
    type: number,
) {
    const { result } = await http.get<{ result: any }>(config.baseUrl + 'search', {
        keywords: keywords,
        limit: limit,
        offset: offset,
        type: type,
    });
    return result;
}
