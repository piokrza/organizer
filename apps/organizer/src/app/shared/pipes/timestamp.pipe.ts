import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

import { DateFormats } from '#core/enums';

@Pipe({ name: 'timestamp', standalone: true })
export class TimestampPipe implements PipeTransform {
  private readonly datePipe = inject(DatePipe);

  transform(timestamp: Timestamp, format: DateFormats): string {
    return this.datePipe.transform(timestamp.toDate(), format) ?? '';
  }
}