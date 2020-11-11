import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { takeWhile } from 'rxjs/operators';
import { IBuilding } from '../../models/building.model';
import { BuildingHttpService } from '../../services/building-http.service';
import { ValidateNickname } from './../../custom-validators/building-nickname.validator';

@Component({
  selector: 'app-building-nickname-editor',
  templateUrl: './building-nickname-editor.component.html',
  styleUrls: ['./building-nickname-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingNicknameEditorComponent implements OnInit, OnDestroy {
  @Input() building: IBuilding;
  @Output() formStatus: EventEmitter<string> = new EventEmitter<string>();

  buildingNicknameForm: FormGroup;
  selectable = true;
  removable = true;
  hasError = false;
  isComponentAlive = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder, private buildingHttpService: BuildingHttpService) {}

  ngOnInit(): void {
    this.buildingNicknameForm = this.fb.group({
      nickname: [null, [Validators.required], ValidateNickname.createValidator(this.buildingHttpService)],
    });

    this.buildingNicknameForm.statusChanges.pipe(takeWhile(() => this.isComponentAlive)).subscribe((status: string) => {
      this.formStatus.emit(status);
    });
  }

  get nickname(): AbstractControl {
    return this.buildingNicknameForm.get('nickname');
  }

  addNickname(event: MatChipInputEvent): void {
    if (this.buildingNicknameForm.valid) {
      const { input, value } = event;

      if ((value || '').trim()) {
        this.building.nicknames.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.buildingNicknameForm.reset();
      this.formStatus.emit(null);
    } else {
      alert('You are trying to add an invalid nickname');
    }
  }

  removeNickname(nickname: string): void {
    const index = this.building.nicknames.indexOf(nickname);

    if (index >= 0) {
      this.building.nicknames.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }
}
