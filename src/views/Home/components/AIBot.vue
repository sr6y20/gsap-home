<template>
    <div style="overflow: auto">
        <n-timeline horizontal>
            <n-popover trigger="hover" raw :show-arrow="false" v-for="stage in stages" :key="stage.title">
                <template #trigger>
                    <n-timeline-item :title="stage.title" :content="stage.content" />
                </template>
                <img :src="stage.img" width="120" height="80" :alt="stage.title" />
            </n-popover>
        </n-timeline>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const stages = ref([
    {
        title: '啊',
        content: '是的',
        img: '/web/blog.png'
    }
]);
</script>

<style scoped lang="scss"></style>
