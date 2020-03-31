import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameDisplayComponent } from './game-display/game-display.component';
import { HomeComponent } from './home/home.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'gamecast', component: GameDisplayComponent},
  {path: 'newgame', component: CreateGameComponent},
  {path: 'register', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
