import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { BuildingAccountRoutingModule } from './building-account-routing.module';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { BuildingNicknameEditorComponent } from './components/building-nickname-editor/building-nickname-editor.component';
import { HomePageComponent } from './containers/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, BuildingListComponent, BuildingNicknameEditorComponent],
  imports: [BuildingAccountRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClientModule],
})
export class BuildingAccountModule {}
