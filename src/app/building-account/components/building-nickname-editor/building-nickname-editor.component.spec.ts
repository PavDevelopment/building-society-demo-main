import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ValidateNickname } from '../../custom-validators/building-nickname.validator';
import { BuildingHttpService } from '../../services/building-http.service';
import { MOCK_BUILDINGS } from './../../mock-data/buildings-mock-data';
import { BuildingNicknameEditorComponent } from './building-nickname-editor.component';

describe('BuildingNicknameEditorComponent', () => {
  let component: BuildingNicknameEditorComponent;
  let fixture: ComponentFixture<BuildingNicknameEditorComponent>;
  let service: BuildingHttpService;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [BuildingNicknameEditorComponent],
      providers: [BuildingHttpService, { provide: FormBuilder, useValue: formBuilder }],
    })
      // doesnt seem to make a difference
      .overrideComponent(BuildingNicknameEditorComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingNicknameEditorComponent);
    component = fixture.componentInstance;
    component.building = MOCK_BUILDINGS()[0];
    component.buildingNicknameForm = formBuilder.group({
      nickname: [null, [Validators.required], ValidateNickname.createValidator(service)],
    });
    service = TestBed.get(BuildingHttpService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the formStatus emitter with a simple subscribe', fakeAsync(() => {
    let formStatus;
    component.formStatus.subscribe((status) => {
      formStatus = status;
    });

    component.buildingNicknameForm.controls.nickname.patchValue('Alistar');
    fixture.detectChanges();

    // checking if the value is valid
    expect(formStatus).toBe('PENDING');

    tick(2000);
    // passing that the value is valid
    expect(formStatus).toBe('VALID');

    component.buildingNicknameForm.controls.nickname.patchValue('Schnitzel');
    fixture.detectChanges();

    // checking if the value is valid
    expect(formStatus).toBe('PENDING');

    tick(2000);
    // passing that the value is invalid
    expect(formStatus).toBe('INVALID');
  }));

  it('should remove a nickname if possiblle', () => {
    expect(component.building.nicknames.length).toBe(2);
    component.removeNickname('Albion Jewel');
    fixture.detectChanges();
    expect(component.building.nicknames.length).toBe(1);
    component.removeNickname('Unknown nickname');
    fixture.detectChanges();
    expect(component.building.nicknames.length).toBe(1);
  });

  it('should add a valid nickname and reset the form', () => {
    const spy = spyOn(service, 'isValidNickname').and.returnValue(of(true));
    component.buildingNicknameForm.controls.nickname.setValue('Albus Dumbledore');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.buildingNicknameForm.valid).toBeTruthy();
    const event = { input: null, value: 'Albus Dumbledore' } as any;
    component.addNickname(event);
    fixture.detectChanges();
    expect(component.building.nicknames).toContain('Albus Dumbledore');
  });

  it('should show the alert if the user tries to add invalid nickname', () => {
    const spy = spyOn(service, 'isValidNickname').and.returnValue(of(false));

    const windowSpy = spyOn(window, 'alert');
    component.buildingNicknameForm.controls.nickname.setValue('Salazar Slytheirn');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.buildingNicknameForm.valid).toBeFalsy();
    const event = { input: null, value: 'Salazar Slytheirn' } as any;
    component.addNickname(event);
    fixture.detectChanges();
    expect(component.building.nicknames).not.toContain('Salazar Slytheirn');
    expect(windowSpy).toHaveBeenCalled();
  });

  it('should have form invalid when empty', () => {
    component.buildingNicknameForm.controls.nickname.setValue('');
    expect(component.buildingNicknameForm.valid).toBeFalsy();
  });

  it('on component destroy lifecycle event it should unsubscribe everywhere by setting flag isComponentAlive to false', () => {
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(component.isComponentAlive).toBeFalsy();
  });
});
