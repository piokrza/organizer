import { FormControl, FormGroup } from '@angular/forms';

export type UserCredentialsForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
  username: FormControl<string>;
}>;
