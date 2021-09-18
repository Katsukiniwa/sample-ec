import { Router } from 'express';
import { ProductController } from './ProductController';

export const ProductRouter = Router();

const productController = new ProductController();

ProductRouter.get('/products', (request, response, next) => {
  (async () => {
    const result = await productController.getProducts(request, response);

    return result;

  })().catch(next);

})
