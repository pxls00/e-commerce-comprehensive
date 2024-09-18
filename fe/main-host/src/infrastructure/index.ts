import type { IUser } from "@/stores/user/user-store.types";
import type { IAuthRequest } from "./auth/auth.types";
import type { IProduct, IProductAddRequest } from "./product/product.types";

export default class Infrastructure {
  static auth = {
    checkAuth () {
      return import("./auth/check-auth").then((module) => module.checkAuth());
    },
    login (payload: IAuthRequest) {
      return import("./auth/login").then((module) => module.login(payload));
    },
    signup (payload: IAuthRequest) {
      return import("./auth/signup").then((module) => module.signup(payload));
    },
    logout () {
      return import("./auth/logout").then((module) => module.logout());
    },
  };

  static user = {
    updateUser (user: IUser) {
      return import("./user/update-user").then((module) => module.updateUser(user));
    },
  };

  static product = {
    getAllProducts () {
      return import("./product/get-all-products").then((module) => module.getAllProducts());
    },
    getProductDetail (uuid: string) {
      return import("./product/get-product-detail").then((module) => module.getProductDetail(uuid));
    },
    updateProduct (product: IProduct) {
      return import("./product/update-product").then((module) => module.updateProduct(product));
    },
    addProduct (product: IProductAddRequest) {
      return import("./product/add-product").then((module) => module.addProduct(product));
    },
    deleteProduct (uuid: string) {
      return import("./product/delete-product").then((module) => module.deleteProduct(uuid));
    },
  };
}