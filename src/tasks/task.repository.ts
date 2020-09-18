import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/entity/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(
    filterDto: GetTasksFilterDto,
    user : User
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', {userId: user.id})

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }


    const tasks = await query.getMany();
    return tasks;

  }


  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }


  async exists(column: string, id: number): Promise<number> {
    const task = await Task.findOne({ [column]: id });
    if (!task) {
      throw new NotFoundException('not found');
    }

    return id;
  }
}