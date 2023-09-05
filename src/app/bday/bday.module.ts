import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BdayRoutingModule } from './bday-routing.module';
import { BdayListComponent } from './bday-list/bday-list.component';
import { BdayItemComponent } from './bday-item/bday-item.component';


@NgModule({
  declarations: [
    BdayListComponent,
    BdayItemComponent
  ],
  imports: [
    CommonModule,
    BdayRoutingModule
  ]
})
export class BdayModule { }
