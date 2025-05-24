<template>
    <div class="loader-container">
        <div class="pokeball"></div>
        <p class="loading-text">正在召唤莉可，请稍候…</p>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const emits = defineEmits(['startLenis', 'stopLenis']);

onMounted(() => {
    // 禁用滚动
    emits('stopLenis');
    document.body.style.overflow = 'hidden';
})
onBeforeUnmount(() => {
    // 启用滚动
    emits('startLenis');
    document.body.style.overflow = 'auto';
})
</script>

<style scoped lang="scss">
.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #393939;
    text-align: center;
    overflow: hidden;
    position: fixed;
    z-index: 999;
    width: 100vw;
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(10px);
}

.pokeball {
    width: 80px;
    height: 80px;
    background: linear-gradient(to bottom, #fff 50%, #ff1c1c 50%);
    border: 4px solid #000;
    border-radius: 50%;
    position: relative;
    animation: spin 1.5s linear infinite;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.pokeball::before,
.pokeball::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
}

.pokeball::before {
    top: 50%;
    width: 100%;
    height: 8px;
    transform: translate(-50%, -50%);
}

.pokeball::after {
    top: 50%;
    width: 20px;
    height: 20px;
    background: white;
    border: 4px solid #000;
    border-radius: 50%;
    z-index: 1;
}

.loading-text {
    margin-top: 24px;
    font-size: 0.875rem;
    animation: flicker 1.5s infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes flicker {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}
</style>
