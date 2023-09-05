import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BdayRoutingModule } from './bday-routing.module';
import { BdayListComponent } from './bday-list/bday-list.component';
import { BdayItemComponent } from './bday-item/bday-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [BdayListComponent, BdayItemComponent],
  imports: [
    CommonModule,
    BdayRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class BdayModule {}
