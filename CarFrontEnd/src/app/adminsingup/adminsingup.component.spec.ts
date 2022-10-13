import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsingupComponent } from './adminsingup.component';

describe('AdminsingupComponent', () => {
  let component: AdminsingupComponent;
  let fixture: ComponentFixture<AdminsingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsingupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
