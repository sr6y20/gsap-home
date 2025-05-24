<script setup lang="ts">
import { ref } from 'vue';

const paused = ref(false);

const links = [{
    name: 'EMAIL',
    icon: '#icon-QQyouxiang_24',
    link: 'mailto:sr6y20@foxmail.com'
}, {
    name: 'BILIBILI',
    icon: '#icon-bilibili',
    link: 'https://space.bilibili.com/484923273'
}, {
    name: 'GITHUB',
    icon: '#icon-GitHub',
    link: 'https://github.com/sr6y20'
}, {
    name: 'GITEE',
    icon: '#icon-gitee',
    link: 'https://gitee.com/sr6y20'
}, {
    name: 'QQ',
    icon: '#icon-QQ',
    link: 'https://res.abeim.cn/api/qq/?qq=1836165455'
}];

const onLinkClick = (link: string) => {
    window.open(link, '_blank');
};

</script>

<template>
    <div class="marquee-container" ref="containerRef" @mouseenter="paused = true" @mouseleave="paused = false">
        <div class="marquee-content" :style="{
            animationPlayState: paused ? 'paused' : 'running'
        }">
            <div class="marquee-track" ref="contentRef">
                <div v-for="link in links" :key="link.name" class="marquee-item" @click="onLinkClick(link.link)"
                    :title="link.link">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="link.icon" />
                    </svg>
                    <div class="text">
                        {{ link.name }}
                    </div>
                </div>
            </div>

            <div class="marquee-track">
                <div v-for="link in links" :key="link.name" class="marquee-item" @click="onLinkClick(link.link)"
                    :title="link.link">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="link.icon" />
                    </svg>
                    <div class="text">
                        {{ link.name }}
                    </div>
                </div>
            </div>
        </div>


        <div class="fade fade-left" />
        <div class="fade fade-right" />
    </div>
</template>

<style scoped lang="scss">
.marquee-container {
    position: relative;
    overflow: hidden;
    background: black;
    padding: 1rem 0;
    width: 65vw;
    margin: 20px auto;

    .marquee-content {
        display: flex;
        width: fit-content;
        animation: scroll-marquee linear infinite;
        animation-duration: 18s;
        will-change: transform;

        .marquee-track {
            display: flex;

            .marquee-item {
                flex: 0 0 auto;
                padding: 20px;
                margin-right: 2rem;
                background: #282828;
                border: 2px solid #AAAAAA;
                display: flex;
                justify-content: center;
                gap: 20px;
                align-items: center;
                color: white;
                font-family: sans-serif;
                border-radius: 8px;
                box-sizing: border-box;
                cursor: pointer;

                &:hover {
                    box-shadow: 0 0 12px white;
                }

                .icon {
                    font-size: 2rem;
                }

                .text {
                    text-align: center;
                    font-size: 1.3rem;
                }

            }
        }
    }

    @keyframes scroll-marquee {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-50%);
        }
    }

    .fade {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 60px;
        pointer-events: none;
        z-index: 2;
    }

    .fade-left {
        left: 0;
        background: linear-gradient(to right, black 0%, transparent 100%);
    }

    .fade-right {
        right: 0;
        background: linear-gradient(to left, black 0%, transparent 100%);
    }
}
</style>
