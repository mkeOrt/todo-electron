import { ipcMain } from 'electron';
import Task from './models';

ipcMain.on('get-one-tasks', async (e, taskId) => {
  const task = await Task.findByPk(taskId);
  e.reply('get-one-tasks', task.getDTO());
});

ipcMain.on('get-all-tasks', async (e) => {
  const tasks = await Task.findAll();
  e.reply('get-all-tasks', tasks.map(task => task.getDTO()));
});

ipcMain.on('create-task', async (e, args) => {
  const task = await Task.create(args);
  e.reply('get-all-tasks', task.getDTO());
});

ipcMain.on('update-task', async (e, args) => {
  const task = await Task.findByPk(args.id);
  if (!task) throw new Error('Task not found');
  task.title = args.title;
  await task.save();
  return task.getDTO();
});

ipcMain.on('update-task', async (e, args) => {
  const task = await Task.findByPk(args.id);
  if (!task) throw new Error('Task not found');
  await task.destroy();
  return task;
});
