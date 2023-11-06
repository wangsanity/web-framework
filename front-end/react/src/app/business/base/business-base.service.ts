import { HttpRequestService } from './http-request.service';
import { type HttpOptions, type QueryFilters } from '../../models';
import { getFilters } from './compose-filters';

export class BusinessBaseService {
  static delete(options: HttpOptions, filters: QueryFilters) {
    options.url = options.url + getFilters(filters);
    return HttpRequestService.delete(options);
  }

  static get(options: HttpOptions, filters: QueryFilters) {
    options.url = options.url + getFilters(filters);
    return HttpRequestService.get(options);
  }

  static put(options: HttpOptions, filters: QueryFilters) {
    options.url = options.url + getFilters(filters);
    return HttpRequestService.put(options);
  }

  static post(options: HttpOptions, filters: QueryFilters) {
    options.url = options.url + getFilters(filters);
    return HttpRequestService.post(options);
  }
}
