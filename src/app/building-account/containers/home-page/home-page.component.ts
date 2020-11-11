import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBuilding } from '../../models/building.model';
import { BuildingHttpService } from './../../services/building-http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  buildings$: Observable<IBuilding[]>;

  constructor(private buildingHttpService: BuildingHttpService) {}

  ngOnInit(): void {
    this.buildings$ = this.buildingHttpService.getBuildings();
  }
}
