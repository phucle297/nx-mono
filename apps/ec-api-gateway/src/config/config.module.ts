import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { app } from './configs/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app],
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
