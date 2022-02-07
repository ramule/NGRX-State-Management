import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeWhile } from 'rxjs';
import { User } from 'src/app/Models/User.model';
import { PrjRepositoryService } from 'src/app/services/prj-repository.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {

  isAlive = true;
  user: User;
  constructor(private activatedRoute: ActivatedRoute, private prjRepo: PrjRepositoryService) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((data: any) => {
    //   this.prjRepo.getUserById(data.id).subscribe(data => {
    //     console.log(data);
    //   });
    // });

    this.fetchData();
  }

  fetchData() {
    const user$ = this.activatedRoute.params.pipe(map(data => data['id']), takeWhile(data => this.isAlive), switchMap((id) => {
      return this.prjRepo.getUserById(id);
    }), filter(res => !!res));

    user$.subscribe(data => {
      this.user = data;
      console.log(this.user);
    })
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
