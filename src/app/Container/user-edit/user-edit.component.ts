import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Models/User.model';
import { PrjRepositoryService } from 'src/app/services/prj-repository.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private prjRepo: PrjRepositoryService) {
    console.log(data);
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(this.data ? this.data.email : '', [Validators.required]),
      name: new FormControl(this.data ? this.data.name : '', [Validators.required]),
    });
  }

  addOrUpdateUser() {
    if(this.data) {
      this.updateUser();
    }
    else {
      this.addUser();
    }
  }

  addUser() {
    this.prjRepo.addUser(this.userForm.value);
    this.dialogRef.close();
  }

  updateUser() {
    const updatedUser = {...this.data, ...this.userForm.value}
    console.log('updated user data: ', updatedUser);
    this.prjRepo.updateUser(updatedUser);
    this.dialogRef.close();
  }

}
