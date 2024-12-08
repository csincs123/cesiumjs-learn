<template>
    <div class="container">
      <!-- 左侧目录 -->
      <div class="sidebar">
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
  
      <!-- 右侧内容 -->
      <div class="content" ref="contentContainer">
        <div
          v-for="(item, index) in sections"
          :key="item.id"
          :id="item.id"
          class="content-section"
        >
          <h2>{{ item.title }}</h2>
          <div style="height: 200px">{{ item.content }}</div>
  
          <div
            v-for="(subItem, subIndex) in item.children"
            :key="subItem.id"
            :id="subItem.id"
            class="sub-content-section"
          >
            <h3>{{ subItem.title }}</h3>
            <div style="height: 400px">{{ subItem.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';
  
  export default {
    components: { ElMenu, ElSubMenu, ElMenuItem },
    setup() {
      const sections = [
        {
          id: 'section1',
          title: 'Section 1',
          content: 'Content for Section 1',
          children: [
            { id: 'subsection1-1', title: 'Subsection 1.1', content: 'Content for Subsection 1.1' },
            { id: 'subsection1-2', title: 'Subsection 1.2', content: 'Content for Subsection 1.2' },
          ],
        },
        {
          id: 'section2',
          title: 'Section 2',
          content: 'Content for Section 2',
          children: [
            { id: 'subsection2-1', title: 'Subsection 2.1', content: 'Content for Subsection 2.1' },
            { id: 'subsection2-2', title: 'Subsection 2.2', content: 'Content for Subsection 2.2' },
          ],
        },
      ];
  
      const activeSection = ref('0');
      const activeSubSection = ref(null);
      const contentContainer = ref(null);
      const menuRef = ref()
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
        if (key.startsWith('sub')) {
          scrollToSubSection(key);
        } else {
          scrollToSection(Number(key));
        }
      };
  
      const observeSections = () => {
        console.log('menuRef.value', menuRef.value)
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
                        console.log('menuRef.value', menuRef.value)
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
  
      return {
        sections,
        activeSection,
        activeSubSection,
        scrollToSection,
        scrollToSubSection,
        handleMenuSelect,
        contentContainer,
        menuRef
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  
  .sidebar {
    width: 20%;
    background-color: #f4f4f4;
    padding-left: 1rem;
    overflow-y: auto;
  }
  
  .content {
    width: 80%;
    padding: 1rem;
    overflow-y: auto;
  }
  
  .content-section {
    margin-bottom: 2rem;
  }
  
  .sub-content-section {
    margin-bottom: 1rem;
    padding-left: 1rem;
    border-left: 2px solid #ddd;
  }
  </style>
  