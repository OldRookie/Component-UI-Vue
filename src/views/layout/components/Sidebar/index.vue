<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item v-for="(menu,index) in menus" :key="index" :item="menu" :base-path="menu.parentPath" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './sidebar-item';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['menus', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
