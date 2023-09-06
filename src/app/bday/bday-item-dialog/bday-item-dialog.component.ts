import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { BdayService } from '../bday.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';

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
    private bdayService: BdayService
  ) {
    this.bdayItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthday: [null, Validators.required],
      likes: this.formBuilder.array([]),
    });
    this.likesFormArray = this.bdayItemForm.get('likes') as FormArray;
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getUser().subscribe((user: User | null) => {
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
    if (this.bdayItemForm.valid) {
      // Puedes agregar lógica aquí para guardar en tu lista
      const { birthday, likes, name } = this.bdayItemForm.value;
      const bdayItem = {
        name: name,
        birthday: birthday,
        likes: likes,
      };
      this.bdayServiceSubscription = this.bdayService.postBdayItem(bdayItem).subscribe((response) => {
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
