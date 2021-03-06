import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HomeComponent } from './home/home.component';
import { GameScoreBoardComponent } from './game-score-board/game-score-board.component';
import { RosterComponent } from './roster/roster.component';
import { EventConsoleComponent } from './event-console/event-console.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CreateGameComponent } from './create-game/create-game.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RosterEditorComponent } from './roster/roster-editor/roster-editor.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NewTeamComponent } from './create-game/new-team/new-team.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizeOperatorComponent } from './event-console/authorize-operator/authorize-operator.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDisplayComponent,
    TitlebarComponent,
    HomeComponent,
    GameScoreBoardComponent,
    RosterComponent,
    EventConsoleComponent,
    CreateGameComponent,
    ChatBoxComponent,
    RosterEditorComponent,
    NewTeamComponent,
    LoginDialogComponent,
    RegistrationComponent,
    AuthorizeOperatorComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ScrollingModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
