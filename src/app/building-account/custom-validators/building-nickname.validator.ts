import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BuildingHttpService } from './../services/building-http.service';
import { Observable } from 'rxjs';

export class ValidateNickname {
  static createValidator(service: BuildingHttpService): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<ValidationErrors | null>  => {
      const value = control.value as string;
      return service.isValidNickname(value).pipe(map((isValid: boolean) => (isValid ? null : { invalidNickname: true })));
    };
  }
}
