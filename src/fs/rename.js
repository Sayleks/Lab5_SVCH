const fs = require("fs");
const path = require("path");

const renameFile = (oldFilename, newFilename) => {
  const oldPath = path.join(__dirname, "parts", oldFilename);
  const newPath = path.join(__dirname, "parts", newFilename);

  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Файл переименован с ${oldFilename} на ${newFilename}`);
  } else {
    console.error("Ошибка: Файл не найден.");
  }
};

const [oldFilename, newFilename] = process.argv.slice(2);

if (oldFilename && newFilename) {
  renameFile(oldFilename, newFilename);
} else {
  console.log(
    "Использование: node rename.js <старое_название> <новое_название>"
  );
}
