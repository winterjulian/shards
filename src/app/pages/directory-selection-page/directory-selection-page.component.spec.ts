import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorySelectionPageComponent } from './directory-selection-page.component';

describe('DirectorySelectionPageComponent', () => {
  let component: DirectorySelectionPageComponent;
  let fixture: ComponentFixture<DirectorySelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorySelectionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorySelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
