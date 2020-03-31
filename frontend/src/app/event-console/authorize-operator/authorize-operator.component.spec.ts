import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeOperatorComponent } from './authorize-operator.component';

describe('AuthorizeOperatorComponent', () => {
  let component: AuthorizeOperatorComponent;
  let fixture: ComponentFixture<AuthorizeOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
