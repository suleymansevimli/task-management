import { Delete, Get, Injectable, NotFoundException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

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

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    user: User,
  ): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    user : User
  ): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId:user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Id number ${id} not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id,user);
    task.status = status;
    await task.save();

    return task;
  }

}
