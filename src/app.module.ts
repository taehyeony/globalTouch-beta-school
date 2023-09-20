import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { JwtAccessStrategy } from './apis/auth/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './apis/auth/strategies/jwt-refresh.strategy';
import { JwtGoogleStrategy } from './apis/auth/strategies/jwt-social-google.strategy';
import { ProjectModule } from './apis/project/project.module';

console.log(process.env.DATABASE_HOST);
@Module({
  imports: [
    AuthModule,
    UserModule,
    ProjectModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: String(process.env.DATABASE_TYPE) as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/apis/**/entities/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  providers: [JwtAccessStrategy, JwtRefreshStrategy, JwtGoogleStrategy],
})
export class AppModule {}
