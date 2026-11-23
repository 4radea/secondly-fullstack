import { Module } from '@nestjs/common';
import { ProdukService } from './produk.service.js';
import { ProdukController } from './produk.controller.js';

@Module({
  controllers: [ProdukController],
  providers: [ProdukService],
})
export class ProdukModule {}
