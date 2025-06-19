import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageDisplayComponent } from './percentage-display.component';

describe('PercentageDisplayComponent', () => {
  let component: PercentageDisplayComponent;
  let fixture: ComponentFixture<PercentageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentageDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
