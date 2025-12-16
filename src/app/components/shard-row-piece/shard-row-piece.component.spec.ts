import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardRowPieceComponent } from './shard-row-piece.component';

describe('ShardRowPieceComponent', () => {
  let component: ShardRowPieceComponent;
  let fixture: ComponentFixture<ShardRowPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShardRowPieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShardRowPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
