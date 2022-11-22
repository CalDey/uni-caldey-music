import { defineStore, storeToRefs } from 'pinia';
import { onUnmounted, watch } from 'vue';
import { getSongUrl, getSongDetail, getSongLyric } from '../config/api/song';
import type { Song, SongUrl } from '../config/models/song';
import { getPlayer } from '../config/utils/initPlayer';

export const usePlayerStore = defineStore({
    id: 'Player',
    state: () => ({
        // audio: uni.createInnerAudioContext(),   // Audio实例
        loopType: 0, // 循环模式 0 列表循环 1 单曲循环 2随机播放
        playList: [] as Song[], // 播放列表
        showPlayList: false, // 播放列表显隐
        id: 0,  // 当前歌曲id
        url: '',    // 歌曲url
        songUrl: {} as SongUrl,
        song: {} as Song,
        isPlaying: false, // 是否播放中
        isPause: false, // 是否暂停
        sliderInput: false, // 是否正在拖动进度条
        ended: false, // 是否播放结束
        muted: false, // 是否静音
        currentTime: 0, // 当前播放时间
        duration: 0, // 总播放时长
        currentLyric: null, // 解析后歌词数据
        playerShow: false, // 控制播放器显隐
    }),
    getters: {
        playListCount: (state) => { // 播放列表歌曲总数
            return state.playList.length;
        },
        thisIndex: (state) => { // 当前播放歌曲索引
            return state.playList.findIndex((song) => song.id === state.id);
        },
        nextSong(state): Song { // 切换下一首
            const { thisIndex, playListCount } = this;
            if (thisIndex === playListCount - 1) {  // 最后一首
                return state.playList[0];
            } else {    // 切换下一首
                const nextIndex: number = thisIndex + 1;
                return state.playList[nextIndex];
            }
        },
        prevSong(state): Song { // 返回上一首
            const { thisIndex } = this;
            if (thisIndex === 0) {  // 第一首
                return state.playList[state.playList.length - 1];
            } else {    // 返回上一首
                const prevIndex: number = thisIndex - 1;
                return state.playList[prevIndex];
            }
        }
    },
    actions: {
        // 播放列表里面添加音乐
        pushPlayList(replace: boolean, ...list: Song[]) {
            if (replace) {
                this.playList = list;
                return;
            }
            list.forEach((song) => {    // 筛除重复歌曲
                if (this.playList.filter((s) => s.id == song.id).length <= 0) {
                    this.playList.push(song);
                }
            })
        },
        // 删除播放列表中某歌曲
        deleteSong(id: number) {
            this.playList.splice(
                this.playList.findIndex((s) => s.id == id),
                1
            )
        },
        // 清空播放列表
        clearPlayList() {
            this.songUrl = {} as SongUrl;
            this.url = '';
            this.id = 0;
            this.song = {} as Song;
            this.isPlaying = false;
            this.isPause = false;
            this.sliderInput = false;
            this.ended = false;
            this.muted = false;
            this.currentTime = 0;
            this.playList = [] as Song[];
            this.showPlayList = false;
            const audio = getPlayer();
            // audio.seek(0);
            audio.stop();
            setTimeout(() => {
                this.duration = 0;
            }, 500);
        },
        // 播放
        async play(id: number) {
            console.log('play')
            if (id == this.id) return;
            this.ended = false;
            this.isPause = false;
            this.isPlaying = false;
            const data = await getSongUrl(id);
            console.log(data)
            // 筛掉会员歌曲和无版权歌曲 freeTrialInfo字段为试听时间
            if(data.url && !data.freeTrialInfo) {
                const audio = getPlayer();
                this.id = id;
                this.songDetail();
                setTimeout(() => {
                    if(!!uni.getBackgroundAudioManager) {
                        // 后台播放数据显示
                        audio.title = this.song.name;   // 歌名
                        audio.singer = this.song.ar[0].name;    // 歌手名
                        audio.epname = this.song.al.name;   // 专辑名
                        audio.coverImgUrl = this.song.al.picUrl;    // 封面
                    }
                    audio.src = 'https://music.163.com/song/media/outer/url?id=' + data.id + '.mp3';
                    console.log(audio.title)
                    audio.play();
                    this.isPlaying = true;
                    this.songUrl = data;
                    this.url = data.url;
                    audio.onError((err:any) => {
                        this.id = id;
                        uni.showToast({
                            icon: "error",
                            title: "该歌曲无法播放"
                        })
                        this.isPause = true;
                        // this.deleteSong(id);
                        // this.next();
                    })
                }, 500)
            }else{
                uni.showToast({
                    icon: "error",
                    title: "该歌曲无法播放"
                })
                this.deleteSong(id);
                this.next();
            }
        },
        // 获取歌词
        async getLyric(id: number) {
            const lyricData = await getSongLyric(id);
            const lyric = JSON.parse(JSON.stringify(lyricData)).lyric;
            return lyric
        },
        // 缓存歌词
        saveLyric(currentLyric: any) {
            this.currentLyric = currentLyric;
        },
        // 播放结束
        playEnd() {
            this.isPause = true;
            console.log('播放结束');
            switch (this.loopType) {
                case 0:
                    this.next();
                    break;
                case 1:
                    this.rePlay();
                    break;
                case 2:
                    this.randomPlay();
                    break;
            }
        },
        // 获取歌曲详情
        async songDetail() {
            this.song = await getSongDetail(this.id);
            this.pushPlayList(false, this.song);
        },
        // 重新播放
        rePlay() {
            setTimeout(() => {
                console.log('replay');
                this.currentTime = 0;
                this.ended = false;
                this.isPause = false;
                this.isPlaying = true;
                const audio = getPlayer();
                audio.seek(0);
                audio.play();
            }, 1500)
        },
        // 下一曲
        next() {
            if (this.loopType === 2) {
                this.randomPlay();
            } else {
                // console.log('next');
                if(this.id === this.nextSong.id) {
                    uni.showToast({
                        icon: "none",
                        title: "没有下一首"
                    })
                }else{
                    this.play(this.nextSong.id);
                }
            }
        },
        // 上一曲
        prev() {
            if(this.id === this.prevSong.id) {
                uni.showToast({
                    icon: "none",
                    title: "没有上一首"
                })
            }else{
                this.play(this.prevSong.id);
            }
        },
        // 随机播放
        randomPlay() {
            console.log('randomPlay')
            this.play(
        this.playList[Math.ceil(Math.random() * this.playList.length - 1)].id,
            )
        },
        // 播放、暂停
        togglePlay() {
            if (!this.song.id) return;
            this.isPlaying = !this.isPlaying;
            const audio = getPlayer();
            if (!this.isPlaying) {
                audio.pause();
                this.isPause = true;
            } else {
                audio.play();
                this.isPause = false;
            }
        },
        setPlay() {
            if (!this.song.id) return;
            const audio = getPlayer();
            this.isPlaying = true;
            audio.play();
            this.isPause = false;
        },
        setPause() {
            if (!this.song.id) return;
            const audio = getPlayer();
            this.isPlaying = false;
            audio.pause();
            this.isPause = true;
        },
        // 切换循环类型
        toggleLoop() {
            if (this.loopType == 2) {
                this.loopType = 0;
            } else {
                this.loopType++;
            }
        },
        // 静音切换
        toggleMuted() {

        },
        // 音量设置
        setVolume(n: number) {

        },
        // 快进
        forward(val: number) {
            const audio = getPlayer();
            audio.seek(this.currentTime + val);
        },
        // 后退
        backup(val: number) {
            const audio = getPlayer();
            if(this.currentTime < 5) {
                audio.seek(0)
            }else{
                audio.seek(this.currentTime - val);
            }
        },
        // 修改播放时间
        onSliderChange(val: number) {
            const audio = getPlayer();
            audio.seek(val);
        },
        // 播放时间拖动中
        onSliderInput(val: number) {

        },
        // 定时器
        interval() {
            if (this.isPlaying && !this.sliderInput) {
                const audio = getPlayer();
                this.currentTime = parseInt(audio.currentTime.toString());
                this.duration = parseInt(audio.duration.toString());
                audio.onEnded(() => {
                    // console.log('end')
                    this.ended = true
                })
            }
        },
        // 控制播放器显隐
        setPlayerShow(val: number) {
            // val 0:显示 1:隐藏
            if (val === 0) {
                this.playerShow = true;
            } else {
                this.playerShow = false;
            }
        }
    }
})

export const useInitPlayer = () => {
    let timer: any;
    const { interval, playEnd, setPlayerShow } = usePlayerStore();
    const { ended, song } = storeToRefs(usePlayerStore());

    // 监听播放结束
    watch(ended, (ended) => {
        console.log('start')
        if (!ended) return
        console.log('end')
        playEnd()
    }),

    // 监听当前歌曲控制播放器显隐
    watch(song, (song) => {
        if (song) {
            setPlayerShow(0);
        } else {
            setPlayerShow(1);
        }
    }),

    // 启动定时器
    console.log('启动定时器');
    timer = setInterval(interval, 1000);

    // 清除定时器
    onUnmounted(() => {
        console.log('清除定时器');
        clearInterval(timer);
    })
}