import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { BuildingHttpService } from '../../services/building-http.service';
import { BuildingAccountModule } from './../../building-account.module';
import { MOCK_BUILDINGS } from './../../mock-data/buildings-mock-data';
import { IBuilding } from './../../models/building.model';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let service: BuildingHttpService;

  let buildingList: DebugElement;
  let loader: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, BuildingAccountModule],
      declarations: [HomePageComponent],
      providers: [BuildingHttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    service = TestBed.get(BuildingHttpService);
    component = fixture.componentInstance;

    buildingList = fixture.debugElement.query(By.css('.building-list'));
    loader = fixture.debugElement.query(By.css('.loader'));
  });

  afterEach(() => {
    service = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly visualize the emitted values from the buildings$ observable', () => {
    const buildings$ = new Subject<IBuilding[]>();
    component.buildings$ = buildings$.asObservable();
    fixture.detectChanges();

    expect(buildingList).toBeNull();
    expect(loader).not.toBeNull();

    buildings$.next(MOCK_BUILDINGS());

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.building-list'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.loader'))).toBeNull();
  });
});
