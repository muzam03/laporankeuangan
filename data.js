// --- KONFIGURASI DATABASE ---
const DB_KEY = 'keuanganDB_v3_final'; // Kunci penyimpanan di browser

// 1. Ambil Data (Read)
function getDatabase() {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
}

// 2. Simpan Data (Write)
function saveDatabase(dataArray) {
    localStorage.setItem(DB_KEY, JSON.stringify(dataArray));
}

// 3. Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// 4. Hitung Rekapitulasi (Untuk Dashboard)
function hitungRekap() {
    const db = getDatabase();
    let masuk = 0, keluar = 0;

    db.forEach(item => {
        const total = item.harga * item.qty;
        if(item.jenis === 'Masuk') masuk += total;
        else keluar += total;
    });

    return { masuk, keluar, saldo: masuk - keluar };
}
