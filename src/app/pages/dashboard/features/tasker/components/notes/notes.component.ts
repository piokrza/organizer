import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { Note } from '#tasker/models';

@Component({
  selector: 'ctrl-notes',
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  @Input({ required: true }) notes!: Note[];

  @Output() removeNote = new EventEmitter<string>();

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}