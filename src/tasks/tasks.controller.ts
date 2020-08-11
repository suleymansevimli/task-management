import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './model/task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService:TasksService) {}

  @Get()
  getFindAll():Task[] {
    return this.tasksService.getFindAll();
  }

  @Post()
  createTask(@Body() data:Task):Task {
    return this.tasksService.createTask(data)
  }
}
