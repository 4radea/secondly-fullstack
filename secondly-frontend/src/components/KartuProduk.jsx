export default function KartuProduk({ produk, onUbahStatus, onHapusProduk }) {
    return (
        <div className="kartu-produk">
        <span className="badge-kategori">{produk.kategori}</span>
        <h3>{produk.nama}</h3>
        <p className="kondisi">{produk.kondisi}</p>
        <p className="harga">Rp {produk.harga.toLocaleString('id-ID')}</p>
        <span className={`status ${produk.status === 'Tersedia' ? 'tersedia' : 'terjual'}`}>
            {produk.status}
        </span>

        <div className="aksi-kartu">
            <button
            type="button"
            className="btn-status"
            onClick={() => onUbahStatus(produk.id, produk.status)}
            >
            {produk.status === 'Tersedia' ? 'Tandai Terjual' : 'Tandai Tersedia'}
            </button>
            <button
            type="button"
            className="btn-hapus"
            onClick={() => onHapusProduk(produk.id, produk.nama)}
            >
            Hapus
            </button>
        </div>
    </div>
    );
}