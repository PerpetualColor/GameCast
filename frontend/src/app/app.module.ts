import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { RosterComponent } from './roster/roster.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDisplayComponent,
    TitlebarComponent,
    HomeComponent,
    RosterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
