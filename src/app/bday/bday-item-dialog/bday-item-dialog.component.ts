import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { BdayService } from '../bday.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { BdayItem } from 'src/app/models/bday-item';

@Component({
  selector: 'app-bday-item-dialog',
  templateUrl: './bday-item-dialog.component.html',
  styleUrls: ['./bday-item-dialog.component.scss'],
})
export class BdayItemDialogComponent implements OnInit, OnDestroy {
  bdayItemForm: FormGroup;
  likesFormArray!: FormArray;
  user!: User | null;
  private bdayServiceSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;

  constructor(
    private dialogRef: MatDialogRef<BdayItemDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private bdayService: BdayService,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; bdayItem?: BdayItem }
  ) {
    this.bdayItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthday: [null, Validators.required],
      likes: this.formBuilder.array([]),
    });
    this.likesFormArray = this.bdayItemForm.get('likes') as FormArray;
  }

  ngOnInit(): void {
    if (this.data.bdayItem && this.data.mode === 'update') {
      console.log(this.data.mode);
      console.log('update', this.data.bdayItem);
      // Limpia cualquier control existente en el FormArray "likes"
      while (this.likesFormArray.length !== 0) {
        this.likesFormArray.removeAt(0);
      }

      // Itera sobre los elementos de "this.data.bdayItem.likes" y crea un FormControl para cada uno
      if (this.data.bdayItem.likes) {
        for (const like of this.data.bdayItem.likes) {
          this.likesFormArray.push(
            this.formBuilder.control(like, Validators.required)
          );
        }
      }
        this.bdayItemForm.setValue({
          name: this.data.bdayItem?.name,
          birthday: this.data.bdayItem?.birthday,
          likes: this.data.bdayItem?.likes,
        });
    }

    this.userSubscription = this.userService
      .getUser()
      .subscribe((user: User | null) => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    if (this.bdayServiceSubscription) {
      this.bdayServiceSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Método para guardar el nuevo cumpleaños en la lista
  saveBdayItem() {
    if (this.data.mode === 'create') {
      if (this.bdayItemForm.valid) {
        // Puedes agregar lógica aquí para guardar en tu lista
        const { birthday, likes, name } = this.bdayItemForm.value;
        const bdayItem = {
          name: name,
          birthday: birthday,
          likes: likes,
        };
        this.bdayServiceSubscription = this.bdayService
          .postBdayItem(bdayItem)
          .subscribe((response) => {
            const user = {
              id: response._id,
              profilename: response.profilename,
              email: response.email,
              image: response.image,
              bdaylist: response.bdaylist,
            };
            this.userService.setUser(user as User);
            this.closeDialog();
          });
      }
    } else if (this.data.bdayItem && this.data.mode === 'update') {
      console.log('saveBdayItem', this.data.bdayItem);
      if (this.bdayItemForm.valid) {
        // Puedes agregar lógica aquí para guardar en tu lista
        const { birthday, likes, name } = this.bdayItemForm.value;
        const bdayItem = {
          name: name,
          birthday: birthday,
          likes: likes,
        };
        console.log("form",this.bdayItemForm.value);
        if (this.data.bdayItem._id) {
          this.bdayServiceSubscription = this.bdayService
            .updateBdaItem(this.user!.id, this.data.bdayItem._id, bdayItem)
            .subscribe((response) => {
              const user = {
                id: response._id,
                profilename: response.profilename,
                email: response.email,
                image: response.image,
                bdaylist: response.bdaylist,
              };
              this.userService.setUser(user as User);
              this.closeDialog();
            });
        }
      }
    }
  }

  // Método para cerrar el diálogo
  closeDialog() {
    this.dialogRef.close();
  }
  addLike() {
    this.likesFormArray.push(this.formBuilder.control('', Validators.required));
  }
  removeLike(index: number) {
    this.likesFormArray.removeAt(index);
  }
}
