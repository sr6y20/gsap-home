<script setup>
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
</script>

<template>
  <n-message-provider>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <RouterView></RouterView>
    </n-config-provider>
  </n-message-provider>
</template>

<style scoped></style>
