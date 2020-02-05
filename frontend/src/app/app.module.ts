import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatRippleModule} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { GameScoreBoardComponent } from './game-score-board/game-score-board.component';
import { RosterComponent } from './roster/roster.component';
import { EventConsoleComponent } from './event-console/event-console.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GameDisplayComponent,
    TitlebarComponent,
    HomeComponent,
    GameScoreBoardComponent,
    RosterComponent,
    EventConsoleComponent,
    CreateGameComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ScrollingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
