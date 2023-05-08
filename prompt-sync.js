const prompt = require('prompt-sync')();
const { fetch, create, update, destroy, getOne } = require('./database/barang');

function tambahBarang() {
  const idBarang = prompt('ID BARANG: ');
  const namaBarang = prompt('NAMA BARANG: ');
  const hargaBarang = prompt('HARGA BARANG: ');
  const kuantitasBarang = prompt('KUANTITAS BARANG: ');

  const barang = {
    idBarang,
    namaBarang,
    hargaBarang,
    kuantitasBarang,
  };
  create(barang);
}

function updateBarang(id) {
  const namaBarang = prompt('NAMA BARANG: ');
  const hargaBarang = prompt('HARGA BARANG: ');
  const kuantitasBarang = prompt('KUANTITAS BARANG: ');
  const barang = {
    namaBarang,
    hargaBarang,
    kuantitasBarang,
  };

  update(barang, id);
}

let pilihan = -1;
while (pilihan != 0) {
  console.log('PILIH MENU:');
  console.log('1. Tambah Barang');
  console.log('2. Lihat Semua Data Barang');
  console.log('3. Lihat Satu Data Barang');
  console.log('4. Update Barang');
  console.log('5. Hapus Barang');
  console.log('0. Keluar');
  pilihan = prompt('Pilihan menu: ');
  if (pilihan == 1) {
    tambahBarang();
  } else if (pilihan == 2) {
    const data = fetch();
    console.log(data);
  } else if (pilihan == 3) {
    const id = prompt('Masukkan ID barang yang akan dilihat: ');
    const data = getOne(id);
    console.log(data);
  }
   else if (pilihan == 4) {
    const id = prompt('Masukkan ID barang yang akan diupdate: ');
    updateBarang(id);
  } else if (pilihan == 5) {
    const id = prompt('Masukkan ID barang yang akan dihapus: ');
    destroy(id);
  } else if (pilihan == 0) {
    process.exit(0);
  }
}
