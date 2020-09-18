import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskNotFoundValidationPipe } from './pipe/task-not-found-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/entity/user.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    console.log('USER', user);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe, TaskNotFoundValidationPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', TaskNotFoundValidationPipe) id: number,
    @GetUser() user : User
  ): Promise<void> {
    return this.tasksService.deleteTask(id,user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', TaskNotFoundValidationPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

}
