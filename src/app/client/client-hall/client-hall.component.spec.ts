import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHallComponent } from './client-hall.component';

describe('ClientHallComponent', () => {
  let component: ClientHallComponent;
  let fixture: ComponentFixture<ClientHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
