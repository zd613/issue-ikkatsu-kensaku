<template>
  <Loader :loading="loading" :size="size" :color="color" />
</template>

<script setup lang="ts">
import Loader from "vue-spinner/src/BounceLoader.vue";

withDefaults(
  defineProps<{
    loading?: boolean;
    size?: string;
    color?: string;
  }>(),
  {
    loading: false,
    size: "25px",
    color: "#3B82F6",
  }
);
</script>
