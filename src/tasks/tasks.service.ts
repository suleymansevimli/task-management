import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  getFindAll(){
    return this.tasks;
  }
}
