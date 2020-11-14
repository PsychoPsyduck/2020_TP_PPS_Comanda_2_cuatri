import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteEsperaPage } from './cliente-espera.page';

describe('ClienteEsperaPage', () => {
  let component: ClienteEsperaPage;
  let fixture: ComponentFixture<ClienteEsperaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteEsperaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteEsperaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
