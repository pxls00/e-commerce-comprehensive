import customerService from "../service/customer-service";
import tokenService from "../service/token-service";

class CustomerController {
  async getCustomers(req: any, res: any, next: (payload?: any) => void) {
    try {
      const customers = await customerService.getAllCustomers();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  async getCustomer(req: any, res: any, next: (payload?: any) => void) {
    try {
      const { uuid } = req.params
      const customer = await customerService.getCustomer(uuid);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentCustomer(req: any, res: any, next: (payload?: any) => void) {
    try {
      const customerFromReq = req.customer;
      let customerUuid = "";
      if (customerFromReq) {
        customerUuid = customerFromReq.uuid
      } else {
        const authorizationHeader = req.headers.authorization;
        const accessToken = authorizationHeader.split(" ")[1];
        const customerFromToken = tokenService.validateAccessToken(accessToken);
        customerUuid = customerFromToken && typeof customerFromToken === "object" ? customerFromToken.uuid : "";
      }

      const customer = await customerService.getCustomer(customerUuid);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req: any, res: any, next: (payload?: any) => void) {
    try {
      const customerUpdatePayload = req.body;
      const customerUuid = req.params.uuid;
      const customer = await customerService.updateCustomer(customerUuid, customerUpdatePayload);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

}

export default new CustomerController();