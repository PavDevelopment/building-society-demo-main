import { TestBed } from '@angular/core/testing';
import { BuildingHttpService } from './../services/building-http.service';
import { ValidateNickname } from './building-nickname.validator';

describe('ValidateNickname', () => {
  let service: BuildingHttpService;
  let spy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingHttpService],
    });
    service = TestBed.get(BuildingHttpService);
    spy = spyOn(ValidateNickname, 'createValidator').and.callThrough();
  });

  afterEach(() => {
    service = null;
  });

  describe('createValidator', () => {
    it('should test if the validator returns static function after being called', () => {
      const result = ValidateNickname.createValidator(service);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(Function));
    });
  });
});
