import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PostComponent } from './Container/post/post.component';
import { UserViewComponent } from './Container/user-view/user-view.component';
import { UsersComponent } from './Container/users/users.component';

const routes: Routes = [
  {path : '', component: DashboardComponent,
  children: [
    {path: '', component: UsersComponent},
    {path: 'user/:id', component: UserViewComponent},
    {path: 'post', component: PostComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
