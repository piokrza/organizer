import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import uniqid from 'uniqid';

import { User } from '#auth/models';
import { AuthSelectors } from '#store/auth';
import { NoteService } from '#tasker/data-access';
import { Note, NoteForm } from '#tasker/models';

@Component({
  selector: 'ctrl-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormComponent {
  private readonly noteService: NoteService = inject(NoteService);
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  public readonly form: FormGroup<NoteForm> = this.noteService.noteForm;
  private readonly user: Signal<User | null | undefined> = toSignal(inject(Store).select(AuthSelectors.user));

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const newNote: Note = {
      ...this.form.getRawValue(),
      id: uniqid(),
      uid: this.user()!.uid,
    };

    this.dialogRef.close(newNote);
  }
}