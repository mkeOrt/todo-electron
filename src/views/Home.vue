<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  mounted() {
    ipcRenderer.send('get-all-tasks');
    // ipcRenderer.send('create-task', {
    //   title: 'test3',
    // });
  },
  created() {
    ipcRenderer.on('get-all-tasks', (e, args) => {
      console.log('get-all-users', args);
    });
    ipcRenderer.on('create-task', (e, args) => {
      console.log('create-task', args);
    });
  },
};
</script>
