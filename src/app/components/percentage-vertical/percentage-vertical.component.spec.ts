import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageVerticalComponent } from './percentage-vertical.component';

describe('PercentageVerticalComponent', () => {
  let component: PercentageVerticalComponent;
  let fixture: ComponentFixture<PercentageVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentageVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentageVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
