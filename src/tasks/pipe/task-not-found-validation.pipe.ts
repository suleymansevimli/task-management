import { PipeTransform } from '@nestjs/common';
import { TaskRepository } from '../task.repository';

export class TaskNotFoundValidationPipe implements PipeTransform {

  readonly column: string;

  constructor( column = 'id') {
    this.column = column ?? 'id';
  }


  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any): any {
    const repo = new TaskRepository;
    return repo.exists(this.column, value);;
  }

}