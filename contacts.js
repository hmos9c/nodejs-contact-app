const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
// membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// membuat file concact
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const contacts = loadContact();
  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold("contact sudah terdaftar"));
    return false;
  }
  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("email tidak valid"));
    }
  }
  // cek no hp
  if (noHp) {
    if (!validator.isMobilePhone(noHp, "id-ID")) {
      console.log(chalk.red.inverse.bold("no hp tidak valid"));
    }
  }
  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log("terimakasih sudah memasukkan data");
};
const listContacts = () => {
  const concacts = loadContact();
  console.log(chalk.cyan.inverse.bold("Daftar contacts : "));
  concacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};
const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }
  console.log(chalk.blue.inverse.bold(contact.nama));
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(`data contact ${nama} berhasil dihapus`);
};
module.exports = { simpanContact, listContacts, detailContact, deleteContact };
