import { Injectable } from '@nestjs/common';
import { Task } from './model/task.model';

@Injectable()
export class TasksService {
  private tasks:Task[] = [];

  getFindAll(): Task[] {
    return this.tasks;
  }

  createTask(data:Task):Task {
    return data;
  }
}
