import { CoreApi } from '@framework/utils/core-api';
import { API_ENDPOINTS } from '@framework/utils/endpoints';

export type CustomerType = {
  _id: string;
  [key: string]: unknown;
};
export type ContactType = {
  name: string;
  email: string;
  subject: string;
  description: string;
};

class Customer extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
  
  createCustomer(input: CustomerType) {    
    return this.http
      .post(API_ENDPOINTS.ADDRESS, input)
      .then((res) => res.data);
  }
  addAddress(input: any) {
    return this.http
      .post(API_ENDPOINTS.ADDRESS, input)
      .then((res) => res.data);
  }
  updateAddress(input: any) {    
    return this.http
      .put(`${API_ENDPOINTS.ADDRESS}/${input._id}`, input)
      .then((res) => res.data);
  }
  updateCustomer(input: CustomerType) {    
    return this.http
      .put(`${API_ENDPOINTS.CUSTOMERS}/${input._id}` , input)
      .then((res) => res.data);
  }
  contact(input: ContactType) {
    return this.http.post(API_ENDPOINTS.CONTACT_US, input).then((res) => res.data);
  }
  deleteAddress(id: any) {
    console.log(id);
    
    return this.http
      .delete(`${API_ENDPOINTS.ADDRESS}/${id}`)
      .then((res) => res.data);
  }
}

export const CustomerService = new Customer(API_ENDPOINTS.CUSTOMERS);
