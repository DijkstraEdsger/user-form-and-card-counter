import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CountCompleteCardsComponent } from './components/count-complete-cards/count-complete-cards.component';

const routes: Routes = [
  {
    path: 'user-form',
    component: CreateUserComponent,
  },
  {
    path: 'complete-cards',
    component: CountCompleteCardsComponent,
  },
  {
    path: '',
    redirectTo: 'user-form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
