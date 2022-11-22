<template>
        <image
            class="flex-shrink-0"
            :class="[circle ? 'rounded-full' : 'rounded-lg', `w-${size}`, `h-${size}` ]"
            :src="imgUrl + `?param=${limitSize}y${limitSize}`"
            :mode="mode"
            lazy-load
        />
</template>

<script setup lang="ts">
const { imgUrl, size, limitSize, mode="scaleToFill", circle=false } = defineProps<{
    imgUrl: string,
    size: number,
    limitSize: number,
    mode?:string,
    circle?: boolean
}>()
</script>