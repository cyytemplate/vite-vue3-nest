import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  // @ts-ignore
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // @ts-ignore
    return next.handle().pipe(
      // @ts-ignore
      map(data => {
        return {
          code: 0,
          message: '',
          data
        }
      }),
      catchError(err => {
        return throwError(err)
      }),
    )
  }
}