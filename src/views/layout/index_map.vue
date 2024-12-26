<script setup>
import {ref} from 'vue'
import sections from '@/assets/contents.json'
const baseUrl = import.meta.env.BASE_URL
let isCollapse = ref(true)

const handleMenuItemClick = (card) => {
  window.open(`/card${card.router}`);
} 
</script>

<template>
  <div class="container">
    <!-- 左侧目录 -->
    <div class="sidebar" >
      <el-menu
        class="el-menu-vertical"
        :collapse="isCollapse"
        unique-opened
        ref="menuRef"
      >
        <el-sub-menu 
        v-for="(item, index) in sections" 
        :key="item.id" 
        :index="String(index)"
        >
          <template #title>
            <img :src="`${baseUrl}${item.iconUrl}`" class="menuIcon">
            <span>{{ item.title }}</span>
          </template>
          <el-sub-menu
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.id"
            :index="subItem.id"
          >
            <template #title>
            <img :src="`${baseUrl}${subItem.iconUrl}`" class="menuIcon">
            {{ subItem.title }}
            </template>
            <el-menu-item 
              v-for="(card, cardIndex) in subItem.card"
              :key="card.title"
              :index="card.title"
              @click="handleMenuItemClick(card)"
            >
            <img :src="`${baseUrl}${card.url}`" class="menuIcon">
            {{ card.title }}
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </div>
    <!-- 右侧内容-地图 -->
    <div class="content">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
   .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  .sidebar {
    background-color: #f4f4f4;
    /* padding-left: 1rem; */
    overflow-y: auto;
  }

  .content {
    flex: 1;
    /* padding: 1rem; */
    overflow-y: auto;
  }

  .menuIcon{
    height: 20px;
    width: 20px;
    padding-right: 5px
  }

</style>