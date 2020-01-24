import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule} from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { GameScoreBoardComponent } from './game-score-board/game-score-board.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDisplayComponent,
    TitlebarComponent,
    HomeComponent,
    GameScoreBoardComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
