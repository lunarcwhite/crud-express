const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, './barang.json');

function getData() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
  let data = fs.readFileSync(dbPath);
  data = data.toString('utf-8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), { encoding: 'utf-8' });
}

function fetch() {
  let data = getData();
  return data;
}

function getOne(idBarang) {
  let data = getData();
  return data.find((d) => d.idBarang == idBarang);
}

function create(bodyData) {
  let data = getData();
  data.push(bodyData);
  writeData(data);
  return bodyData;
}

function update(bodyData, idBarang) {
  let data = getOne(idBarang);
  let allData = fetch();
  data = { ...data, ...bodyData };
  const index = allData.findIndex((d) => d.idBarang == idBarang);
  if (index === undefined || !data) {
    throw Error('data tidak ditemukan');
  }
  allData[index] = data;
  writeData(allData);
  return data;
}

function destroy(idBarang) {
  let data = fetch();
  data = data.filter((d) => d.idBarang != idBarang);
  writeData(data);
}

module.exports = {
  fetch,
  create,
  getOne,
  update,
  destroy,
};
