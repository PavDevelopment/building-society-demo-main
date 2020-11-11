import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';

export const buildingAccountRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(buildingAccountRoutes)],
  exports: [RouterModule],
})
export class BuildingAccountRoutingModule {}
