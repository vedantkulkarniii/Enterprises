import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn', 'log'] 
      : ['debug', 'error', 'warn', 'log'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // ============================================================================
  // SECURITY MIDDLEWARE
  // ============================================================================

  // Helmet for HTTP headers security
  app.use(helmet.default({
    contentSecurityPolicy: false, // Handled separately if needed
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }));

  // Enable CORS with strict whitelist
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:3001'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  });

  // ============================================================================
  // VERSIONING
  // ============================================================================

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });

  // ============================================================================
  // GLOBAL PIPES & FILTERS
  // ============================================================================

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filters
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
  );

  // Global response transform interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // ============================================================================
  // SWAGGER DOCUMENTATION
  // ============================================================================

  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Enterprise Platform API')
      .setDescription('Production-grade Enterprise Multi-Business Digital Ecosystem API')
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
        },
        'bearer',
      )
      .addServer(
        `http://localhost:${port}`,
        'Development Server',
      )
      .addTag('Auth', 'Authentication endpoints')
      .addTag('Users', 'User management endpoints')
      .addTag('Organizations', 'Organization management endpoints')
      .addTag('Roles', 'Role and permission management')
      .addTag('Projects', 'Project management endpoints')
      .addTag('Tasks', 'Task management endpoints')
      .addTag('Audit', 'Audit log endpoints')
      .addTag('Analytics', 'Analytics and reporting endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'list',
      },
    });
  }

  // ============================================================================
  // START SERVER
  // ============================================================================

  await app.listen(port, () => {
    Logger.log(
      `🚀 Enterprise Platform Backend Server running at http://localhost:${port}`,
      'Bootstrap',
    );
    Logger.log(
      `📚 API Documentation: http://localhost:${port}/api/docs`,
      'Bootstrap',
    );
    Logger.log(
      `🔧 Environment: ${nodeEnv}`,
      'Bootstrap',
    );
  });
}

bootstrap().catch((error) => {
  Logger.error('Failed to bootstrap application:', error, 'Bootstrap');
  process.exit(1);
});
