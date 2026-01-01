import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardsListHeaderComponent } from './shards-list-header.component';

describe('ShardsListHeaderComponent', () => {
  let component: ShardsListHeaderComponent;
  let fixture: ComponentFixture<ShardsListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShardsListHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShardsListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
