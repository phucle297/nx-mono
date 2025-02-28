import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const typeOrmConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity.{ts,js}'], // Tự động load entities
    synchronize: configService.get<boolean>('DB_SYNCHRONIZE') // Không nên dùng true trong production!
  })
}
