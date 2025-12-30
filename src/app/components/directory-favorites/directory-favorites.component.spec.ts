import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryFavoritesComponent } from './directory-favorites.component';

describe('DirectoryFavoritesComponent', () => {
  let component: DirectoryFavoritesComponent;
  let fixture: ComponentFixture<DirectoryFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectoryFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
