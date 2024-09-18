import { validationResult } from "express-validator";

import ApiError from "../exceptions/api-errors";
import productService from "../service/product-service";

class ProductController{
  async addProduct(req: any, res: any, next: (payload?: any) => void) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }

      const productToAdd = req.body;
      const product = await productService.addProduct(productToAdd);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req: any, res: any, next: (payload?: any) => void) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getOneProduct(req: any, res: any, next: (payload?: any) => void) {
    try {
      const { uuid } = req.params;

      const product = await productService.getOneProduct(uuid);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: any, res: any, next: (payload?: any) => void) {
    try {
      const { uuid } = req.params;

      const product = await productService.getOneProduct(uuid);
      await productService.deleteProduct(uuid);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: any, res: any, next: (payload?: any) => void) {
    try {
      const { uuid } = req.params;
      const productFromRequest = req.body;

      const productFromDB = await productService.getOneProduct(uuid);
      const product = await productService.updateProduct(productFromDB, productFromRequest);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();