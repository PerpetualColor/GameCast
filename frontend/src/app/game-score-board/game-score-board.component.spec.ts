import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreBoardComponent } from './game-score-board.component';

describe('GameScoreBoardComponent', () => {
  let component: GameScoreBoardComponent;
  let fixture: ComponentFixture<GameScoreBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoreBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
