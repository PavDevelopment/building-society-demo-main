import { Location } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { buildingAccountRoutes, BuildingAccountRoutingModule } from './building-account-routing.module';
import { HomePageComponent } from './containers/home-page/home-page.component';

describe('The Building Account Routing', () => {
  let router: Router;
  let location: Location;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BuildingAccountRoutingModule, RouterTestingModule.withRoutes(buildingAccountRoutes)],
      declarations: [HomePageComponent],
    });

    router = TestBed.get(Router) as Router;
    location = TestBed.get(Location) as Location;
    fixture = TestBed.createComponent(HomePageComponent);

    router.initialNavigation();
  });

  it('should be able to navigate to `/`', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));
});
