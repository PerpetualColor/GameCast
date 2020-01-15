import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameDisplayComponent } from './game-display/game-display.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'gamecast', component: GameDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
