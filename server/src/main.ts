import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter/exception.filter';
import { TransformInterceptor } from './common/interceptor/result.interceptor';
import { resolve, join } from 'path'
import { readFileSync } from 'fs'
import { NestExpressApplication } from '@nestjs/platform-express';
const isDev = process.env.NODE_ENV === 'DEV'

async function bootstrap() {
  const appOptions: NestApplicationOptions  = {}
  if (!isDev) {
    appOptions.logger = ['error']
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);
  app.useStaticAssets(join(__dirname, '../../dist'),{
    prefix: '/static/',   //设置虚拟路径
  })

  app.use(function(req, res, next) {
    if (!req.path.startsWith('/api/')) {
      res.setHeader('Content-Type', 'text/html')
      const indexHtml = readFileSync(resolve(__dirname, '../../dist/index.html'), 'utf-8')
      return res.send(indexHtml)
    }
    next()
  })
  app.setGlobalPrefix('api');
  // 全局校验管道配置
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  // 全局拦截器
  // @ts-ignore
  app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
