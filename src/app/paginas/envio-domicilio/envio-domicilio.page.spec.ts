import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnvioDomicilioPage } from './envio-domicilio.page';

describe('EnvioDomicilioPage', () => {
  let component: EnvioDomicilioPage;
  let fixture: ComponentFixture<EnvioDomicilioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioDomicilioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnvioDomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
