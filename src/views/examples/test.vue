<template>
    <div class="container">
      <!-- 左侧目录 -->
      <div class="sidebar">
        <ul>
          <li
            v-for="(item, index) in sections"
            :key="item.id"
            :class="{ active: activeSection === index }"
            @click="scrollToSection(index)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
  
      <!-- 右侧内容 --> 
      <!-- ref="contentContainer" -->
      <div class="content" ref="contentContainer"> 
        <div
          v-for="(item, index) in sections"
          :key="item.id"
          :id="item.id"
          class="content-section"
        >
          <h2>{{ item.title }}</h2>
          <div style="height: 600px">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    setup() {
      const sections = [
        { id: 'section1', title: 'Section 1', content: 'Content for Section 1' },
        { id: 'section2', title: 'Section 2', content: 'Content for Section 2' },
        { id: 'section3', title: 'Section 3', content: 'Content for Section 3' },
        { id: 'section4', title: 'Section 4', content: 'Content for Section 4' },
      ];
  
      const activeSection = ref(0);
      const contentContainer = ref(null);
      let observers = [];
  
      const scrollToSection = (index) => {
        const section = document.getElementById(sections[index].id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
  
      const observeSections = () => {
        sections.forEach((item, index) => {
          const section = document.getElementById(item.id);
          if (section) {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    activeSection.value = index;
                  }
                });
              },
              { root: contentContainer.value, threshold: 0.6 }
            //   contentContainer.value
            );
            observer.observe(section);
            observers.push(observer);
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
        scrollToSection,
        contentContainer,
      };
    },
  };
  </script>
  
  <style>
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  
  .sidebar {
    width: 20%;
    background-color: #f4f4f4;
    padding: 1rem;
    overflow-y: auto;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .sidebar li.active {
    background-color: #007bff;
    color: white;
  }
  
  .sidebar li:hover {
    background-color: #eaeaea;
  }
  
  .content {
    width: 80%;
    padding: 1rem;
    overflow-y: auto;
  }
  
  .content-section {
    margin-bottom: 2rem;
  }
  </style>
  