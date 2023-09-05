import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BdayListComponent } from './bday-list/bday-list.component';

const routes: Routes = [
  {path: '', component: BdayListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BdayRoutingModule { }
