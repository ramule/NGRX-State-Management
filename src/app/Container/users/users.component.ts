import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { User } from 'src/app/Models/User.model';
import { PrjRepositoryService } from 'src/app/services/prj-repository.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  usersData: User[] = [];
  loading: boolean = false;
  err: boolean = false;
  errData: any;
  isAlive: boolean = true;
  constructor(
    private prjRepo: PrjRepositoryService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    const observer$ = this.prjRepo.getUserList();
    console.log('observer: ', observer$);
    const loading$ = observer$[0];
    const usrData$ = observer$[1];
    const error$ = observer$[2];
    const errorData$ = observer$[3];
    usrData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.usersData = data;
      console.log('userdata: ', this.usersData);
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data=> {
      this.loading = data;
      console.log('loadingdata: ', data);
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data=> {
      this.err = data;
      console.log('error: ', data);
    });
    errorData$.pipe(takeWhile(() => this.isAlive)).subscribe(data=> {
      this.errData = data;
      console.log('errordata: ', this.errData);
    });
  }

  onTryAgain() {
    this.prjRepo.getUserList(true);
  }

  onDeleteUser(usr: User) {
    this.prjRepo.deleteUser(usr.id);
  }

  onEditUser(user: any) {
    this.dialog.open(UserEditComponent, {
      width: '256px', data: user
    })
  }

  addUser() {
    this.dialog.open(UserEditComponent, {
      width: '256px'
    })
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  openUserDetails(user: User) {
    this.router.navigate(['user', user.id])
  }
}
