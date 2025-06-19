import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceToolComponent } from './replace-tool.component';

describe('ReplaceToolComponent', () => {
  let component: ReplaceToolComponent;
  let fixture: ComponentFixture<ReplaceToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplaceToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplaceToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
