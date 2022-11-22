import { http, config } from '../config'
import type { Banner, Personalized, PersonalizedNewSong } from "../models/recommend";

class Recommend {
	// Banner
	async Banners() {
		const { banners } = await http.get<{ banners: Banner[] }>(config.baseUrl + 'banner', { type: 1 })
		return banners
	}
	// 推荐歌单
	async Personalized() {
		const { result } = await http.get<{ result: Personalized[] }>(config.baseUrl + 'personalized?limit=8')
		return result
	}
	// 推荐新音乐
	async PersonalizedNewSong() {
		const { result } = await http.get<{ result: PersonalizedNewSong[] }>(config.baseUrl + 'personalized/newsong')
		return result
	}
}

export const recommend = new Recommend();