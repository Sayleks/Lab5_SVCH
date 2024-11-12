const fs = require("fs");
const path = require("path");

const readPart = (id) => {
  const indexPath = path.join(__dirname, "parts", "parts_index.json");
  const index = JSON.parse(fs.readFileSync(indexPath));
  const part = index.find((part) => part.id === id);

  if (!part) {
    console.error("Ошибка: Запчасть не найдена.");
    return;
  }

  const partPath = path.join(__dirname, "parts", part.filename);
  const partData = fs.readFileSync(partPath);

  console.log("Информация о запчасти:");
  console.log(partData.toString());
};

const id = process.argv[2];

if (id) {
  readPart(id);
} else {
  console.log("Использование: node read.js <id запчасти>");
}