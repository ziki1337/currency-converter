import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyConverterModule } from './currency-converter/currency-converter.module';

@Module({
  imports: [CurrencyConverterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
