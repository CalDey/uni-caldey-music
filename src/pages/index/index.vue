<template>
  <view class="safe-container">
    <Swiper :banners="banners" />
    <Search />
    <RecommendPlayList :personalizedData="personalizedData" />
    <NewSong :PersonalizedNewSongData="PersonalizedNewSongData" />
  </view>
  <Player />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { recommend } from "@/config/api/recommend";
import type { Banner, Personalized, PersonalizedNewSong } from "@/config/models/recommend";
import Swiper from "@/pages/index/components/Swiper.vue";
import Search from "@/pages/index/components/Search.vue";
import RecommendPlayList from "@/pages/index/components/RecommendPlayList.vue";
import NewSong from "@/pages/index/components/NewSong.vue";
import Player from "@/components/Player.vue";

const banners = ref<Banner[]>([]);
const personalizedData = ref<Personalized[]>([])
const PersonalizedNewSongData = ref<PersonalizedNewSong[]>([])

const getBanners = async () => {
  banners.value = await recommend.Banners();
};
const getPersonalized = async () => {
  personalizedData.value = await recommend.Personalized();
};
const getPersonalizedNewSong = async () => {
  PersonalizedNewSongData.value = await recommend.PersonalizedNewSong();
};

const initData = () => {
  getBanners();
  getPersonalized();
  getPersonalizedNewSong();
}
initData()
</script>

<style lang="scss" scoped>
.safe-container {
  @apply m-2;
}
</style>
