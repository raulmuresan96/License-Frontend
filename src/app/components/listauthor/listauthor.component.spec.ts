import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListauthorComponent } from './listauthor.component';

describe('ListauthorComponent', () => {
  let component: ListauthorComponent;
  let fixture: ComponentFixture<ListauthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListauthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
