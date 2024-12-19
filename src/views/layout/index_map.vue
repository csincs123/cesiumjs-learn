<script setup>
import {ref} from 'vue'
import sections from '@/assets/contents.json'

let isCollapse = ref(true)
let showCard = ref(false)
</script>

<template>
  <div class="container">
    <!-- 左侧目录 -->
    <div class="sidebar" >
      <el-button @click="isCollapse=!isCollapse">展开\关闭</el-button> 
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :value="false">展开</el-radio-button>
      <el-radio-button :value="true">关闭</el-radio-button>
    </el-radio-group> -->
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
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.id"
            :index="subItem.id"
            :class="{ 'is-active': activeSubSection === subItem.id }"
          >
            {{ subItem.title }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <!-- 右侧内容-卡片 -->
      <div class="content" ref="contentContainer" v-show="showCard">
        <div
          v-for="(item, index) in sections"
          :key="item.id"
          :id="item.id"
          class="content-section"
        >
          <h2>{{ item.title }}</h2>
  
          <div
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.id"
            :id="subItem.id"
            class="sub-content-section"
          >
            <h3 class="header">{{ subItem.title }}</h3> 
            <div class="tip">{{ subItem.tip }} </div>
            <div class= 'cardBox'>
              <div 
              class = 'card' 
              v-for="(card,cardIndex) in subItem.card"
              :key="card"
              @click="clickCard(card)"
              >
                <div class = 'title'>
                  {{card.title}}
                </div>
                <img :src="card.url">
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- 右侧内容-地图 -->
    <div class="contents">
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
    padding-left: 1rem;
    overflow-y: auto;
  }

  .content {
    padding: 1rem;
    overflow-y: auto;
  }
</style>