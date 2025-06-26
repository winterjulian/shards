import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicktoolWrapperComponent } from './quicktool-wrapper.component';

describe('QuicktoolWrapperComponent', () => {
  let component: QuicktoolWrapperComponent;
  let fixture: ComponentFixture<QuicktoolWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuicktoolWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuicktoolWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
