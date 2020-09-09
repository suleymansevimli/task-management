import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
      const { status, search } = filterDto;
      let tasks = this.getFindAll();

      if (status) {
       tasks = tasks.filter(task => task.status === status)
      }

      if (search) {
        tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
      }

      return tasks;
  }


  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task = {
      id: '1234',
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task)
    return task;
    
  }

  deleteTask(id:string): void {
    this.tasks = this.tasks.filter(task => { task.id === id; })
  }

  updateTaskStatus(id:string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

}
