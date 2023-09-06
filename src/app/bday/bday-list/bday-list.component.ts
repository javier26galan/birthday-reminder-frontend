import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BdayItem } from 'src/app/models/bday-item';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { BdayItemDialogComponent } from '../bday-item-dialog/bday-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { BdayService } from '../bday.service';
declare var handleSignOut: any;

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-bday-list',
  templateUrl: './bday-list.component.html',
  styleUrls: ['./bday-list.component.scss'],
})
export class BdayListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Name', 'Birthday', 'Likes', 'Actions'];
  dataSource!: MatTableDataSource<BdayItem>;
  user: User | null = null;
  bdayList: BdayItem[] | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private bdayService: BdayService,
    private dialog: MatDialog // public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.user?.bdaylist);
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: User | null) => {
      this.user = user;
      this.bdayList = user?.bdaylist;
      if (this.bdayList) {
        this.dataSource.data = this.bdayList;
      }
    });
    // this.bdayService.getBdayList().subscribe((bdayList:any) => {
    //   // Actualiza la lista de cumpleaños en el componente
    //   this.bdayList = bdayList;
    //   this.dataSource.data = this.bdayList ;
    // });
    console.log(this.user);
    console.log(this.bdayList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editBdayItem(bdayItemId: string) {
    // Aquí puedes abrir un cuadro de diálogo de edición o redirigir a una página de edición
    // Puedes pasar el objeto bdayItem a la página de edición para realizar las modificaciones.
  }

  deleteBdayItem(bdayItemId: string) {
    console.log(bdayItemId);
    this.bdayService.deleteBdayItem(this.user!.id, bdayItemId).subscribe((response)=>{
      console.log("bday-listdelete",response);
      const user = {
        id: response._id,
        profilename: response.profilename,
        email: response.email,
        image: response.image,
        bdaylist: response.bdaylist,
      };
      console.log("bday-list user",user);

      this.userService.setUser(user as User);
    })
  }

  onSignOut() {
    handleSignOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  openBdayItemDialog() {
    const dialogRef = this.dialog.open(BdayItemDialogComponent, {
      width: '400px', // Personaliza el ancho según tus necesidades
    });

    dialogRef.afterClosed().subscribe((result: BdayItem) => {
      if (result) {
        // Aquí puedes agregar lógica para agregar el nuevo cumpleaños a tu lista
        console.log('Nuevo cumpleaños:', result);
      }
    });
  }
}
