import dbQuery from "../db";
import ApiError from "../exceptions/api-errors";

class ProductService {
  async addProduct(product: any) {
    const productResponse = await dbQuery(
      `INSERT INTO product (name, description, price) VALUES ($1, $2, $3) RETURNING *`,
      [product.name, product.description, product.price]
    );

    if (!productResponse.rows[0]) {
      throw ApiError.BadRequest("Не удалось добавить продукт");
    }

    return productResponse.rows[0];
  }

  async getProducts() {
    const productResponse = await dbQuery(`SELECT * FROM product`);

    if (productResponse.rows.length) {
      return productResponse.rows;
    } else {
      throw ApiError.BadRequest("Что-то кого-то там");
    }
  }

  async getOneProduct(uuid: string) {
    const productResponse = await dbQuery(`SELECT * FROM product WHERE uuid = $1`, [uuid]);

    if (!productResponse.rows[0]) {
      throw new Error("Продукт не найден")
    }

    return productResponse.rows[0];
  }

  async updateProduct(productFromDB: any, productFromRequest: any) {
    const productResponse = await dbQuery(
      `UPDATE product SET name = $1, description = $2, price = $3 WHERE uuid = $4 RETURNING *`,
      [
        (productFromRequest.name || productFromDB.name),
        (productFromRequest.description || productFromDB.description),
        (productFromRequest.price || productFromDB.price),
        productFromDB.uuid
      ]
    );

    if (!productResponse.rows[0]) {
      throw new Error("Продукт не найден")
    }

    return productResponse.rows[0];
  }

  async deleteProduct(uuid: string) {
    await dbQuery(`DELETE FROM product WHERE uuid = $1`, [uuid]);
  }
}

export default new ProductService();