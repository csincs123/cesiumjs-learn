<script setup>
import {ref} from 'vue'
import sections from '@/assets/contents.json'

let isCollapse = ref(true)
let showCard = ref(false)

const handleMenuItemClick = (card) => {
  console.log('card', card)
  window.open(`/card${card.router}`);
} 
</script>

<template>
  <div class="container">
    <!-- 左侧目录 -->
    <div class="sidebar" >
      <el-menu
        :default-active="activeSection"
        class="el-menu-vertical"
        @select="handleMenuSelect"
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
            <img :src="item.iconUrl" style="height: 20px; width: 20px">
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.id"
            :index="subItem.id"
          >
          <!-- :class="{ 'is-active': activeSubSection === subItem.id }" -->
            <template #title>
              <img :src="subItem.iconUrl" style="height: 20px; width: 20px">
              {{ subItem.title }}
            </template>
            <el-menu-item 
              v-for="(card, cardIndex) in subItem.card"
              :key="card.title"
              :index="card.title"
              @click="handleMenuItemClick(card)"
            >
            {{ card.title }}
            </el-menu-item>
          </el-menu-item-group>
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
</style>