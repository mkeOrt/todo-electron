import { ipcMain } from 'electron';
import Task from './models';

ipcMain.on('get-all-tasks', async (e, args) => {
  const tasks = await Task.findAll();
  e.reply('get-all-tasks', tasks.map(task => task.getDTO()));
})

ipcMain.on('create-task', async (e, args) => {
  const task = await Task.create(args);
  e.reply('get-all-tasks', task.getDTO());
})
