import { FormControl, FormGroup } from '@angular/forms';

export type AuthForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
  username: FormControl<string>;
}>;

export interface AuthPayload {
  email: string;
  password: string;
  username?: string;
}
