import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id:"1",
      title:"First Task",
      description: "task description",
      status: TaskStatus.OPEN
    },
    {
      id:"2",
      title:"Second Task",
      description: "task description",
      status: TaskStatus.IN_PROGRESS
    },
    {
      id:"3",
      title:"Third Task",
      description: "task description",
      status: TaskStatus.DONE
    }
  ];

  getFindAll(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    return {
      id: '1234',
      title,
      description,
      status: TaskStatus.OPEN,
    };
  }
}
