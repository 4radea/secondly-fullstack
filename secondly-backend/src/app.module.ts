import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProdukModule } from './produk/produk.module.js';

@Module({
  imports: [ProdukModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}