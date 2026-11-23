import {
    IsString,
    IsNotEmpty,
    MinLength,
    IsIn,
    IsNumber,
    Min,
    IsOptional,
} from 'class-validator';

export class CreateProdukDto {
    @IsString({ message: 'Nama barang harus berupa teks' })
    @IsNotEmpty({ message: 'Nama barang tidak boleh kosong' })
    @MinLength(3, { message: 'Nama barang minimal 3 karakter' })
    nama: string;

    @IsString()
    @IsIn(['Elektronik', 'Pakaian', 'Sepatu', 'Buku', 'Aksesoris'], {
    message: 'Kategori tidak valid',
    })
    kategori: string;

    @IsNumber({}, { message: 'Harga harus berupa angka' })
    @Min(1000, { message: 'Harga minimal Rp1.000' })
    harga: number;

    @IsString()
    @IsIn(['Bekas - Seperti Baru', 'Bekas - Sangat Baik', 'Bekas - Baik'], {
    message: 'Pilihan kondisi tidak valid',
    })
    kondisi: string;

    @IsOptional()
    @IsIn(['Tersedia', 'Terjual'], {
    message: 'Status harus Tersedia atau Terjual',
    })
    status?: string;
}