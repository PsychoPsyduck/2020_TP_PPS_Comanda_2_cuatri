import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaAutorizarPage } from './lista-autorizar.page';

describe('ListaAutorizarPage', () => {
  let component: ListaAutorizarPage;
  let fixture: ComponentFixture<ListaAutorizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAutorizarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAutorizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
