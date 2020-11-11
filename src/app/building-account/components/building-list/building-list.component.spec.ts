import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MOCK_BUILDINGS } from './../../mock-data/buildings-mock-data';
import { BuildingListComponent } from './building-list.component';

describe('BuildingListComponent', () => {
  let component: BuildingListComponent;
  let fixture: ComponentFixture<BuildingListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BuildingListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingListComponent);
    component = fixture.componentInstance;
    component.buildings = MOCK_BUILDINGS();
    component.formStatus = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('UI', () => {
    it('should correctly render the passed @Input value with buildings array', (done) => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.buildings.length).toBe(1);
        expect(fixture.debugElement.query(By.css('.building-list-container'))).not.toBeNull();
      });
      done();
    });
  });

  describe('handleFormStatusChange', () => {
    it('should set the form status correctlly', () => {
      expect(component.formStatus).toBe(null);
      component.handleFormStatusChange('PENDING');
      fixture.detectChanges();
      expect(component.formStatus).toBe('PENDING');
    });
  });

  describe('enableNicknamesEditorModeClick', () => {
    it('should set nicknamesEditorMode corectlly and assign edited building if active', () => {
      const mockBuilding = MOCK_BUILDINGS()[0];
      component.enableNicknamesEditorModeClick(mockBuilding);
      fixture.detectChanges();
      expect(component.isNicknamesEditorModeEnabled).toBeTruthy();
      expect(component.editedBuilding).toEqual(mockBuilding);

      component.enableNicknamesEditorModeClick(mockBuilding);
      fixture.detectChanges();
      expect(component.isNicknamesEditorModeEnabled).toBeFalsy();
      expect(component.editedBuilding).toBe(null);
    });
  });
});
