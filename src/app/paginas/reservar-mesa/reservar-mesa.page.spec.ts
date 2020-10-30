import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservarMesaPage } from './reservar-mesa.page';

describe('ReservarMesaPage', () => {
  let component: ReservarMesaPage;
  let fixture: ComponentFixture<ReservarMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservarMesaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservarMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
