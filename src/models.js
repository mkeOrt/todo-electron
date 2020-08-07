import { Model, DataTypes } from 'sequelize';
import sequelize from './database';

class Task extends Model {
  getDTO() {
    return {
      id: this.id,
      title: this.title,
    };
  }
}
Task.init({
  title: DataTypes.STRING,
}, { sequelize, modelName: 'task' });

export default Task;
