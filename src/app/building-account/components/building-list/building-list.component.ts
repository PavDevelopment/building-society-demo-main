import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBuilding } from '../../models/building.model';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingListComponent {
  @Input() buildings: IBuilding[] = [];
  isNicknamesEditorModeEnabled = false;
  editedBuilding: IBuilding = null;
  formStatus: string = null;
  constructor() {}

  enableNicknamesEditorModeClick(building: IBuilding): void {
    this.isNicknamesEditorModeEnabled = !this.isNicknamesEditorModeEnabled;
    this.isNicknamesEditorModeEnabled ? (this.editedBuilding = { ...building }) : (this.editedBuilding = null);
  }

  handleFormStatusChange(status: string): void {
    this.formStatus = status;
  }
}
