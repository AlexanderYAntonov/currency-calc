import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CurrencyService } from "./services";
import { Observable } from "rxjs";

describe("AppComponent", () => {
  const currencyServiceStub: Partial<CurrencyService> = {
    getCurrency(type: string): Observable<number> {
      return new Observable();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: CurrencyService,
          useValue: currencyServiceStub
        }
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
