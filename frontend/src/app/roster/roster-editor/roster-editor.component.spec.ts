import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterEditorComponent } from './roster-editor.component';

describe('RosterEditorComponent', () => {
  let component: RosterEditorComponent;
  let fixture: ComponentFixture<RosterEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
