<script setup>
import {defineProps, ref} from 'vue'
const props = defineProps({
  options: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  }
})
const curOptions = ref('')

const handleSelect = (handleFunction) => {
  handleFunction()
}
</script>

<template>
  <div class="select">
    <el-select
        v-model="curOptions"
        @change="handleSelect"
    >
        <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value">  
        </el-option>
    </el-select>
  </div>
</template>

<style scoped>
  .select {
    z-index: 100;
    position: absolute;
    top: 10px;
    left: 200px;
    width: 240px
  }
</style>