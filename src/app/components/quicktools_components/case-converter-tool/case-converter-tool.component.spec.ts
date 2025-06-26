import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseConverterToolComponent } from './case-converter-tool.component';

describe('CaseConverterToolComponent', () => {
  let component: CaseConverterToolComponent;
  let fixture: ComponentFixture<CaseConverterToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseConverterToolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseConverterToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
