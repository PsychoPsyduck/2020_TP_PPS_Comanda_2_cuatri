import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaCobrosPage } from './lista-cobros.page';

describe('ListaCobrosPage', () => {
  let component: ListaCobrosPage;
  let fixture: ComponentFixture<ListaCobrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCobrosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCobrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
