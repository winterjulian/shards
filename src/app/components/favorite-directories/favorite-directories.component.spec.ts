import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDirectoriesComponent } from './favorite-directories.component';

describe('FavoriteDirectoriesComponent', () => {
  let component: FavoriteDirectoriesComponent;
  let fixture: ComponentFixture<FavoriteDirectoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteDirectoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteDirectoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
