import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePaginationComponent } from './recipe-pagination.component';

describe('RecipePaginationComponent', () => {
  let component: RecipePaginationComponent;
  let fixture: ComponentFixture<RecipePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipePaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
