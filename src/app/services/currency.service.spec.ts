import { TestBed } from "@angular/core/testing";

import { CurrencyService } from "./currency.service";
import { HttpClientModule } from "@angular/common/http";

describe("CurrencyService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it("should be created", () => {
    const service: CurrencyService = TestBed.get(CurrencyService);
    expect(service).toBeTruthy();
  });
});
