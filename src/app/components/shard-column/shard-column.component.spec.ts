import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardColumnComponent } from './shard-column.component';

describe('ShardColumnComponent', () => {
  let component: ShardColumnComponent;
  let fixture: ComponentFixture<ShardColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShardColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShardColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
