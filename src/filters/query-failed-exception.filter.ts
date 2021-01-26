import {ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger} from '@nestjs/common';
import {Request, Response} from 'express';
import {QueryFailedError} from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(QueryFailedExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    this.logger.log(exception);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const {url} = request;
    const {message} = exception;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      message,
    };
    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
