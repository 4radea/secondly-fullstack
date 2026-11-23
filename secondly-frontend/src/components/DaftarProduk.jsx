import KartuProduk from './KartuProduk';

export default function DaftarProduk({
    daftarProduk,
    loading,
    errorServer,
    onUbahStatus,
    onHapusProduk,
}) {
    return (
    <div className="daftar-produk-container">
        <h2>Daftar Barang Katalog</h2>

        {loading ? (
            <p className="pesan-kosong">Memuat data katalog dari server...</p>
        ) : errorServer ? (
            <p className="alert-error">{errorServer} (Pastikan backend NestJS aktif di port 3000)</p>
        ) : daftarProduk.length === 0 ? (
            <p className="pesan-kosong">Belum ada data Produk.</p>
        ) : (
            <div className="grid-produk">
            {daftarProduk.map((item) => (
                <KartuProduk
                key={item.id}
                produk={item}
                onUbahStatus={onUbahStatus}
                onHapusProduk={onHapusProduk}
                />
            ))}
            </div>
        )}
        </div>
    );
}