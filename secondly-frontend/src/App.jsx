import { useState, useEffect } from 'react';
import Header from './components/Header';
import Ringkasan from './components/Ringkasan';
import FormTambahProduk from './components/FormTambahProduk';
import DaftarProduk from './components/DaftarProduk';
import './App.css';

const API_URL = 'http://localhost:3000/produk';

export default function App() {
  const [daftarProduk, setDaftarProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorServer, setErrorServer] = useState(null);

  // GET: Ambil daftar produk dari backend saat aplikasi dimuat
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        setLoading(true);
        setErrorServer(null);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Gagal memuat data produk dari server.');
        const data = await response.json();
        setDaftarProduk(data);
      } catch (err) {
        setErrorServer(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, []);

  // POST: Tambah produk baru ke backend
  const handleTambahProduk = async (produkBaru) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produkBaru),
    });

    const data = await response.json();

    if (!response.ok) {
      // Tangkap pesan validasi DTO (array) atau ConflictException (string)
      const pesanError = Array.isArray(data.message)
        ? data.message.join(', ')
        : data.message || 'Gagal menambahkan produk.';
      throw new Error(pesanError);
    }

    setDaftarProduk((prev) => [data, ...prev]);
  };

  // PATCH: Ubah status Tersedia <-> Terjual di backend
  const handleUbahStatus = async (id, statusSekarang) => {
    const statusBaru = statusSekarang === 'Tersedia' ? 'Terjual' : 'Tersedia';
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusBaru }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengubah status.');

      setDaftarProduk((prev) =>
        prev.map((item) => (item.id === id ? data : item))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // DELETE: Hapus produk dari backend
  const handleHapusProduk = async (id, nama) => {
    if (!window.confirm(`Yakin ingin menghapus "${nama}" dari katalog?`)) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menghapus produk.');

      setDaftarProduk((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const totalTersedia = daftarProduk.filter((p) => p.status === 'Tersedia').length;

  return (
    <div className="app-container">
      <Header />
      <Ringkasan totalProduk={daftarProduk.length} totalTersedia={totalTersedia} />

      <div className="main-content">
        <FormTambahProduk onTambahProduk={handleTambahProduk} />
        <DaftarProduk
          daftarProduk={daftarProduk}
          loading={loading}
          errorServer={errorServer}
          onUbahStatus={handleUbahStatus}
          onHapusProduk={handleHapusProduk}
        />
      </div>
    </div>
  );
}