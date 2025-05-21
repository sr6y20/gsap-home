<script setup lang="ts">
import { gsap } from "gsap";

import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { onMounted } from "vue";

gsap.registerPlugin(Draggable, InertiaPlugin);

onMounted(() => {

    Draggable.create(".p-card-blog", {
        bounds: ".container",
        inertia: true
    });
})

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="p-card p-card-blog">
                <div>
                    <span>MY BLOG</span>
                </div>
                <img src="/web/blog.png" alt="blog">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    position: relative;
    width: 98vw;
    height: 98vh;
    max-width: 98vw;
    max-height: 98vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 9px;

    .p-card {
        width: 661px;
        height: 500px;
        max-width: 52vw;
        max-height: 60vh;
        will-change: transform;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #FFFFFF;

        img {
            width: 98%;
            border-radius: 10px;
            object-fit: cover;
        }

        span {
            font-weight: bold;
            font-size: 2em;
            color: #123DC8;
        }
    }
}
</style>