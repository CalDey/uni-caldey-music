<template>
        <image
            class="flex-shrink-0 cover-img"
            :class="[circle ? 'rounded-full' : 'rounded-lg', `w-${size}`, `h-${size}` ]"
            :src="imgUrl + `?param=${limitSize}y${limitSize}`"
            :mode="mode"
            lazy-load
            @error="handleError"
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

const handleError = (e: any) => {
    e.target.src = '../../static/defaultIMG.png'
}
</script>