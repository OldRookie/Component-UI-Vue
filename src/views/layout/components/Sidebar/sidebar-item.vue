<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="!item.children">
      <app-link :to="resolvePath(item.path)">
        <el-menu-item :index="resolvePath(item.path)">
          <template slot="title">
            <item v-if="item.meta" :icon="item.meta.icon" :iconClass="item.meta.iconClass" :title="generateTitle(item.meta.title)" />
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <template v-else>
      <el-submenu ref="submenu" :index="resolvePath(item.path)">
        <template slot="title">
          <item v-if="item.meta" :icon="item.meta.icon" :iconClass="item.meta.iconClass" :title="generateTitle(item.meta.title)" />
        </template>

        <template v-if="item.children.length>0" v-for="(child,index) in item.children">
          <sidebar-item :item="child" :key="index" :base-path="resolvePath(child.parentPath)" />
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import path from 'path';
import { generateTitle } from '@/utils/i18n';
import { isExternal } from '@/utils';
import Item from './item.vue';
import AppLink from './link.vue';
import FixiOSBug from './fix-ios-bug';

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
      default: function() {
        return { meta: { icon: '', iconClass: '' } };
      },
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    isExternalLink(routePath) {
      return isExternal(routePath);
    },
    generateTitle,
  },
};
</script>
