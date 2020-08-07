<template>
  <div class="hello">
    <div class="row">
      <div class="col">
        <!-- textp {{ allTasksList }} -->
        <b-form-textarea
          id="text"
          v-model="taskDescription"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <b-button @click="addTask(taskDescription)">Aceptar</b-button>
      </div>
      <div class="col" id="tasksList">
        <b-card v-for="(task,index) in allTasksList" :key="task.id">
          <b-card-text>
            {{task.title}} ide:
            {{task.id}}
          </b-card-text>
          <b-button @click="editTask(task,index)" variant="primary" class="mr-2">Editar</b-button>
          <b-button @click="deleteTask(index)" variant="danger">Eliminar</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { ipcRenderer } from 'electron';

export default {
  data() {
    return {
      taskDescription: 'Tarea',
      allTasksList: [],
      allTasksListCounter: 0,
      taskEditing: false,
      task2: '',
    };
  },
  name: 'Home',
  mounted() {
    ipcRenderer.send('get-all-tasks');
    // ipcRenderer.send('create-task', {
    //   title: 'test3',
    // });
  },
  methods: {
    addTask(task) {
      if (!this.taskEditing) {
        ipcRenderer.send('create-task', {
          title: task,
        });
        // TODO Si un código no se utiliza no lo dejes
        // this.allTasksList.push({
        //   title: task,
        //   id: this.allTasksListCounter += 1,
        // });
      } else {
        // TODO No hagas aqui la inserción
        this.allTasksList[this.task2.indice].title = this.taskDescription;
        this.taskEditing = false;
        this.task2 = '';
      }
      ipcRenderer.send('get-all-tasks');
    },
    editTask(task, index) {
      this.taskEditing = true;
      this.taskDescription = task.title;
      this.task2 = task;
      this.task2.indice = index;
    },
    deleteTask(index) {
      this.allTasksList.splice(index, 1);
    },
  },
  created() {
    ipcRenderer.on('get-all-tasks', (e, args) => {
      this.allTasksList = args;
    });
    ipcRenderer.on('create-task', (e, args) => {
      console.log(args);
      // TODO Aqui espera a que te responda para que lo agreges al listado
    });
  },
  destroyed() {
    ipcRenderer.removeAllListeners();
  },
};
</script>
