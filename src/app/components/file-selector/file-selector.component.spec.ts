import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectorComponent } from './file-selector.component';

describe('FileSelectorComponent', () => {
  let component: FileSelectorComponent;
  let fixture: ComponentFixture<FileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
