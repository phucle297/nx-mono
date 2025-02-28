import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationOptions: {
        abortEarly: true,
        allowUnknown: false
      }
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class AppConfigModule {}
