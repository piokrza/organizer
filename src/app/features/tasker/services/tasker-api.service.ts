import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';

import { Collection } from '#core/enums';
import { Note, Task, TaskStep, ToggleIsStepCompletePayload } from '#tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskerApiService {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  loadTasks$(uid: string): Observable<Task[]> {
    const tasks$: AngularFirestoreCollection<Task> = this.angularFirestore.collection<Task>(Collection.TASKS, (ref) => {
      return ref.where('uid', '==', uid);
    });

    return tasks$.valueChanges({ idField: 'id' });
  }

  loadNotes$(uid: string): Observable<Note[]> {
    const notes$: AngularFirestoreCollection<Note> = this.angularFirestore.collection<Note>(Collection.NOTES, (ref) => {
      return ref.where('uid', '==', uid);
    });

    return notes$.valueChanges({ idField: 'id' });
  }

  addTask(task: Task): Promise<DocumentReference<Task>> {
    const tasksCollection: AngularFirestoreCollection<Task> = this.angularFirestore.collection<Task>(Collection.TASKS);
    return tasksCollection.add(task);
  }

  async editTask(updatedTask: Task): Promise<void> {
    const task: AngularFirestoreDocument<Task> = this.angularFirestore.collection<Task>(Collection.TASKS).doc(updatedTask.id);
    return await task.update(updatedTask);
  }

  async editNote(updatedNote: Note): Promise<void> {
    const note: AngularFirestoreDocument<Note> = this.angularFirestore.collection<Task>(Collection.NOTES).doc(updatedNote.id);
    return await note.update(updatedNote);
  }

  toggleIsTaskComplete(taskId: string) {
    const taskRef: AngularFirestoreDocument<Task> = this.getTaskRef(taskId);

    return taskRef.get().pipe(
      tap((task) => {
        if (task.exists) {
          taskRef.update({
            isComplete: !task.data()?.isComplete,
            steps: task.data()?.steps.map((step: TaskStep) => ({ ...step, isComplete: !task.data()?.isComplete })),
          });
        }
      })
    );
  }

  toggleIsStepComplete(payload: ToggleIsStepCompletePayload) {
    const taskRef: AngularFirestoreDocument<Task> = this.getTaskRef(payload.taskId);

    return taskRef.get().pipe(
      tap((task) => {
        if (task.exists) {
          const taskSteps: TaskStep[] = task.data()?.steps ?? [];
          const stepToUpdate: TaskStep | undefined = taskSteps.find(({ id }) => id === payload.stepId);

          if (stepToUpdate) {
            stepToUpdate.isComplete = !stepToUpdate.isComplete;

            taskRef.update({
              steps: taskSteps,
              isComplete: taskSteps.every((step) => step.isComplete),
            });
          }
        }
      })
    );
  }

  addNote(note: Note): Promise<DocumentReference<Note>> {
    const notesCollection: AngularFirestoreCollection<Note> = this.angularFirestore.collection<Note>(Collection.NOTES);
    return notesCollection.add(note);
  }

  async removeTask(taskId: string): Promise<void> {
    return await this.getTaskRef(taskId).delete();
  }

  async removeNote(noteId: string): Promise<void> {
    return await this.getNoteRef(noteId).delete();
  }

  private getTaskRef(taskId: string): AngularFirestoreDocument<Task> {
    return this.angularFirestore.collection(Collection.TASKS).doc(taskId);
  }

  private getNoteRef(noteId: string): AngularFirestoreDocument<Note> {
    return this.angularFirestore.collection(Collection.NOTES).doc(noteId);
  }
}