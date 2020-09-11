import {
  Body,
  Controller,
  Delete,
  Get, NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getFindAll();
    }

  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const found = this.tasksService.getTaskById(id);

    if(!found) {
      throw new NotFoundException("Task was not found")
    }

    return found;

  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

}
