import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

type Message = {
  message: string;
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Message, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status
    let message: string 
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      let res = exception.getResponse() as Message
      message = res.message
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message 
    }
      
    response
      .status(200)
      .json({
        code: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
