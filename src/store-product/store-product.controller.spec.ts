import { Test, TestingModule } from "@nestjs/testing";
import { StoreProductController } from "./store-product.controller";

describe("StoreProductController", () => {
  let controller: StoreProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreProductController],
    }).compile();

    controller = module.get<StoreProductController>(StoreProductController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
