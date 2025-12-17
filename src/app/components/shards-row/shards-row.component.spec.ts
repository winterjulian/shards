import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardsRowComponent } from './shards-row.component';

describe('ShardsRowComponent', () => {
  let component: ShardsRowComponent;
  let fixture: ComponentFixture<ShardsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShardsRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShardsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
