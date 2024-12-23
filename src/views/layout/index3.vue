<template>
    <div class="container">
      <!-- 左侧目录 -->
      <div class="sidebar" >
        <el-menu
          :default-active="activeSection"
          class="el-menu-vertical"
          @select="handleMenuSelect"
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
            <el-menu-item
              v-for="(subItem, subIndex) in item.children"
              :key="subItem.id"
              :index="subItem.id"
              :class="{ 'is-active': activeSubSection === subItem.id }"
            >
              <template #title>
                <img :src="subItem.iconUrl" style="height: 20px; width: 20px">
                {{ subItem.title }}
               </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <!-- 右侧内容-卡片 -->
      <div class="content" ref="contentContainer">
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
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';
  import { useRouter, useRoute } from 'vue-router';
  import sections from '@/assets/contents.json';
  
  export default {
    components: { ElMenu, ElSubMenu, ElMenuItem },
    setup() {
      const activeSection = ref('0');
      const activeSubSection = ref(null);
      const contentContainer = ref(null);
      const menuRef = ref()
      const showCard = ref(true)
      let observers = [];
  
      const scrollToSection = (index) => {
        const section = document.getElementById(sections[index].id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
  
      const scrollToSubSection = (id) => {
        const subsection = document.getElementById(id);
        if (subsection) {
          subsection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
  
      const handleMenuSelect = (key) => {
        showCard.value = true
        if (key.startsWith('sub')) {
          scrollToSubSection(key);
        } else {
          scrollToSection(Number(key));
        }
      };
  
      const observeSections = () => {
        sections.forEach((item, index) => {
          const section = document.getElementById(item.id);
        //   if (section) {
        //     const observer = new IntersectionObserver(
        //       (entries) => {
        //         entries.forEach((entry) => {
        //           if (entry.isIntersecting) {
        //             activeSection.value = String(index);
        //           }
        //         });
        //       },
        //       { root: contentContainer.value, threshold: 0.6 }
        //     );
        //     observer.observe(section);
        //     observers.push(observer);
        //   }
  
          if (item.children) {
            item.children.forEach((subItem) => {
              const subsection = document.getElementById(subItem.id);
              if (subsection) {
                const observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        activeSubSection.value = subItem.id;
                        menuRef.value.open(index)
                        // activeSection.value = item.id
                      }
                    });
                  },
                  { root: contentContainer.value, threshold: 0.6 }
                );
                observer.observe(subsection);
                observers.push(observer);
              }
            });
          }
        });
      };
  
      onMounted(() => {
        observeSections();
      });
  
      onUnmounted(() => {
        observers.forEach((observer) => observer.disconnect());
      });

      const clickCard = (cardItem) => {
        window.open(`/card${cardItem.router}`);
      }
  
      return {
        sections,
        activeSection,
        activeSubSection,
        scrollToSection,
        scrollToSubSection,
        handleMenuSelect,
        contentContainer,
        menuRef,
        clickCard,
        showCard
      };
    },
  };
  // width: 100%;
  //   height: auto;
  //   display: block;
  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh;
    /* width: 100vw; */
    /* overflow: hidden; */
  }
  h2, h3 {
    text-align: left;
  }
  .sidebar {
    width: 15%;
    min-width: 150px;
    background-color: #f4f4f4;
    /* padding-left: 1rem; */
    overflow-y: auto;
  }
  
  .content {
    /* width: 80%; */
    padding: 1rem;
    overflow-y: auto;
  }
  
  .content-section {
    /* width: 70vw; */
    margin-bottom: 2rem;
  }
  
  .sub-content-section {
    margin-bottom: 1rem;
    padding-left: 1rem;
    border-left: 2px solid #ddd;
  }

  .cardBox {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 自适应列数，每列宽 度至少为 200px  minmax(200px, 1fr) */
    gap: 20px; /* 卡片间距 */
  }
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  .card img {
    flex-grow: 1; /* 占据卡片的可用空间 */
    width: 100%;
    object-fit: cover; /* 图片缩放以覆盖区域，避免变形 */
  }

  .card .title {
    padding: 10px;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
  }
  </style>
   <!-- object-fit: cover; /* 图片缩放以覆盖区域，避免变形 */ -->