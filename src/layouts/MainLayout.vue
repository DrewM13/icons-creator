<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Criador de Ícones</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Links Essenciais </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Github',
    caption: 'github.com/DrewM13/icons-creator',
    icon: 'fab fa-github',
    link: 'https://github.com/DrewM13/icons-creator',
  },
  {
    title: 'LinkedIn',
    caption: 'linkedin.com/in/andrew-maciel',
    icon: 'fab fa-linkedin',
    link: 'https://linkedin.com/in/andrew-maciel',
  },
];

const leftDrawerOpen = ref<boolean>(false);

function toggleLeftDrawer(): void {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
