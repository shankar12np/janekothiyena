import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksAndCreditCardsComponent } from './banks-and-credit-cards.component';

describe('BanksAndCreditCardsComponent', () => {
  let component: BanksAndCreditCardsComponent;
  let fixture: ComponentFixture<BanksAndCreditCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanksAndCreditCardsComponent]
    });
    fixture = TestBed.createComponent(BanksAndCreditCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
