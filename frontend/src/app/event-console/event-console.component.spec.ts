import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConsoleComponent } from './event-console.component';

describe('EventConsoleComponent', () => {
  let component: EventConsoleComponent;
  let fixture: ComponentFixture<EventConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
