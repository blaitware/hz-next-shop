import pickBy from 'lodash/pickBy';
import Request from './request';
type NumberOrString = number | string;
export type ParamsType = {
  type?: string;
  text?: string;
  category?: string;
  status?: string;
  is_active?: string;
  shop_id?: string;
  limit?: number;
};
export class CoreApi {
  http = Request;
  constructor(public _base_path: string) { }
  private stringifySearchQuery(values: any) {
    const parsedValues = pickBy(values);
    return Object.keys(parsedValues)
      .map((k) => {
        if (k === 'type') {
          return `${k}.slug:${parsedValues[k]};`;
        }
        if (k === 'category') {
          return `categories.slug:${parsedValues[k]};`;
        }
        return `${k}:${parsedValues[k]};`;
      })
      .join('')
      .slice(0, -1);
  }
  find(params: ParamsType) {
    const {
      type,
      text,
      category,
      status,
      is_active,
      shop_id,
      limit = 30,
    } = params;    

    const queryString = `?${text ? `search=${text}` : ''}${type ? `&type=${type}` : ''
      }${category ? `&category=${category}` : ''}${shop_id ? `shop=${shop_id}` : ''
      }${status ? `&status=${status}` : ''
      }&searchJoin=and&limit=${limit}`;

    return this.http.get(this._base_path + queryString);
  }
  findAll() {
    return this.http.get(this._base_path);
  }
  fetchUrl(url: string) {    
    return this.http.get(url);
  }
  getUrl(url: string) {
    return this.http.get(`${this._base_path}/${url}`)
  }
  postUrl(url: string, data: any) {
    return this.http.post(url, data);
  }
  findOne(id: NumberOrString) {
    return this.http.get(`${this._base_path}/${id}`);
  }
  create(data: any, options?: any) {    
    return this.http
      .post(this._base_path, data, options)
      .then((res) => res.data);
  }
  update(id: NumberOrString, data: any) {
    return this.http
      .put(`${this._base_path}/${id}`, data)
      .then((res) => res.data);
  }
  delete(id: NumberOrString) {
    return this.http.delete(`${this._base_path}/${id}`);
  }
}
