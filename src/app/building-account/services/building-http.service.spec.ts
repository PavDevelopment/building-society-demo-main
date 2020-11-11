import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MOCK_BUILDINGS } from './../mock-data/buildings-mock-data';
import { IBuilding } from './../models/building.model';
import { BuildingHttpService } from './building-http.service';
import { of } from 'rxjs';

describe('BuildingHttpServiceService', () => {
  let service: BuildingHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingHttpService);
  });

  afterEach(() => {
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBuildings', () => {
    it('should return mocked Building after 2 seconds delay', fakeAsync(() => {
      let buildings;
      service.getBuildings().subscribe((response: IBuilding[]) => {
        buildings = response;
      });
      tick(2000);
      expect(buildings).toEqual(MOCK_BUILDINGS());
    }));
  });

  describe('startsWith', () => {
    it('should return true if passed string first letter matches the starting letter', () => {
      const startingLetter = 'o';
      const stringToValidate = 'onion';
      expect(service.startsWith(stringToValidate, startingLetter)).toBeTruthy();
    });
    it('should return false if passed string first letter doesnt match the starting letter', () => {
      const startingLetter = 'o';
      const stringToValidate = 'watermelon';
      expect(service.startsWith(stringToValidate, startingLetter)).toBeFalsy();
    });
  });

  describe('isValidNickname', () => {
    it('should return mocked true observable in the subscribe', fakeAsync(() => {
      const spy = spyOn(service, 'isValidNickname').and.returnValue(
        of(true)
      );

      let response;
      service.isValidNickname('Albion').subscribe((isValid: boolean) => {
        response = isValid;
      });
      expect(response).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    }));

    it('should return mocked false observable in the subscribe', fakeAsync(() => {
      const spy = spyOn(service, 'isValidNickname').and.returnValue(
        of(false)
      );

      let response;
      service.isValidNickname('Hogwart').subscribe((isValid: boolean) => {
        response = isValid;
      });
      expect(response).toBeFalsy();
      expect(spy).toHaveBeenCalled();
    }));
  });
});
