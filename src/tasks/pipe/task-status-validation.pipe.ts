import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../model/task.model';

export class TaskStatusValidationPipe implements PipeTransform{

  readonly allowedStatus = [
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
    TaskStatus.DONE
  ]


  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any): any {

    value = value.toUpperCase();

    if (!this.isStatusValid(value)){
      throw new BadRequestException('Status value is invalid !')
    }
    return value;
  }

  private isStatusValid(status:any): any {
    const idx =  this.allowedStatus.indexOf(status);
    return idx !== -1;
  }

}