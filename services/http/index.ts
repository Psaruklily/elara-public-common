import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpMethods, IHttpParams } from '../../interfaces';
import { axiosInstance } from './axios-instance';

class HTTPService {
  http<R>(method: IHttpMethods, config: AxiosRequestConfig = {}, ...httpParams: IHttpParams): Observable<R> {
    return from(axiosInstance[method]<R>(...httpParams, config))
      .pipe(
        map((response: AxiosResponse<R>) => response.data),
      );
  }
}

export default new HTTPService();
