import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProdukDto } from './dto/create-produk.dto.js';
import { UpdateProdukDto } from './dto/update-produk.dto.js';
import { Produk } from './entities/produk.entity.js';

@Injectable()
export class ProdukService {
  private daftarProduk: Produk[] = [
    {
      id: 1,
      nama: 'Laptop Bekas',
      kategori: 'Elektronik',
      harga: 3500000,
      kondisi: 'Bekas - Sangat Baik',
      status: 'Tersedia',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      nama: 'Sepatu Sneakers',
      kategori: 'Sepatu',
      harga: 250000,
      kondisi: 'Bekas - Baik',
      status: 'Tersedia',
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      nama: 'Buku Pemrograman',
      kategori: 'Buku',
      harga: 75000,
      kondisi: 'Bekas - Baik',
      status: 'Tersedia',
      createdAt: new Date().toISOString(),
    },
  ];

  create(createProdukDto: CreateProdukDto): Produk {
    // Error 1: ConflictException jika nama produk sudah ada
    const duplikat = this.daftarProduk.find(
      (item) => item.nama.toLowerCase() === createProdukDto.nama.toLowerCase(),
    );
    if (duplikat) {
      throw new ConflictException(
        `Produk "${createProdukDto.nama}" sudah terdaftar di katalog!`,
      );
    }

    const produkBaru: Produk = {
      id:
        this.daftarProduk.length > 0
          ? Math.max(...this.daftarProduk.map((p) => p.id)) + 1
          : 1,
      nama: createProdukDto.nama,
      kategori: createProdukDto.kategori,
      harga: createProdukDto.harga,
      kondisi: createProdukDto.kondisi,
      status: createProdukDto.status || 'Tersedia',
      createdAt: new Date().toISOString(),
    };

    this.daftarProduk.unshift(produkBaru);
    return produkBaru;
  }

  findAll(): Produk[] {
    return this.daftarProduk;
  }

  findOne(id: number): Produk {
    // Error 2: NotFoundException jika ID tidak ditemukan
    const produk = this.daftarProduk.find((item) => item.id === id);
    if (!produk) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan!`);
    }
    return produk;
  }

  update(id: number, updateProdukDto: UpdateProdukDto): Produk {
    const index = this.daftarProduk.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan!`);
    }

    this.daftarProduk[index] = {
      ...this.daftarProduk[index],
      ...updateProdukDto,
    };

    return this.daftarProduk[index];
  }

  remove(id: number): { message: string } {
    const index = this.daftarProduk.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan!`);
    }

    const terhapus = this.daftarProduk[index];
    this.daftarProduk.splice(index, 1);
    return { message: `Produk "${terhapus.nama}" berhasil dihapus.` };
  }
}