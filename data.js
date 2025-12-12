// KUNCI DATABASE (Nama file penyimpnan di browser)
const DB_KEY = 'keuanganDB_v2';

// FUNGSI 1: Ambil Data (Read JSON)
function getDatabase() {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
}

// FUNGSI 2: Simpan Data (Write JSON)
function saveDatabase(dataArray) {
    localStorage.setItem(DB_KEY, JSON.stringify(dataArray));
}

// FUNGSI HELPER: Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// FUNGSI HITUNG REKAP (Untuk Dashboard)
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