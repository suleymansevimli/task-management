import { Delete, Get, Injectable, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  // getFindAll(): Task[] {
  //   return this.tasks;
  // }
  //
  // getTaskById(id: string): Task {
  //   return this.tasks.find(task => task.id === id);
  // }
  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;
  //     let tasks = this.getFindAll();
  //
  //     if (status) {
  //      tasks = tasks.filter(task => task.status === status)
  //     }
  //
  //     if (search) {
  //       tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
  //     }
  //
  //     return tasks;
  // }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.taskRepository.delete(id)

    if (result.affected === 0){
      throw new NotFoundException(`Id number ${id} not found` )
    }
  }

  async updateTaskStatus(id:number,status:TaskStatus) : Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status;
    await task.save()

    return task;
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task = {
  //     id: '1234',
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //
  //   this.tasks.push(task)
  //   return task;
  //
  // }
  //
  // deleteTask(id:string): void {
  //   this.tasks = this.tasks.filter(task => { task.id === id; })
  // }
  //
  // updateTaskStatus(id:string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

}
