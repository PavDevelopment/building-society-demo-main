import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { MOCK_BUILDINGS } from '../mock-data/buildings-mock-data';
import { IBuilding } from '../models/building.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingHttpService {
  private acceptableStartingLetterForNickname = 'a';
  constructor() {}

  getBuildings(): Observable<Array<IBuilding>> {
    return of(MOCK_BUILDINGS()).pipe(delay(2000));
  }

  isValidNickname(nickname: string): Observable<boolean> {
    return timer(1000).pipe(
      switchMap(() => {
        return this.startsWith(nickname.toLowerCase(), this.acceptableStartingLetterForNickname) ? of(true) : of(false);
      }),
    );
  }

  startsWith(stringToValidate: string, startingLetter: string): boolean {
    return stringToValidate.lastIndexOf(startingLetter, 0) === 0;
  }
}
