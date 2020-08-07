import { Model, DataTypes } from 'sequelize';
import sequelize from './database';

class Task extends Model {
  getDTO() {
    return {
      title: this.title,
    };
  }
}
Task.init({
  title: DataTypes.STRING,
}, { sequelize, modelName: 'task' });

export default Task;
