import { TaskStatus } from '../model/task.model';

export class GetTasksFilterDto
{
  status : TaskStatus
  search: string
}