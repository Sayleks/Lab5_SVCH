const fs = require("fs");
const path = require("path");

const deletePart = (id) => {
  const indexPath = path.join(__dirname, "parts", "parts_index.json");
  const index = JSON.parse(fs.readFileSync(indexPath));
  const part = index.find((part) => part.id === id);

  if (!part) {
    console.error("Ошибка: Запись не найдена.");
    return;
  }

  const partPath = path.join(__dirname, "parts", part.filename);

  if (fs.existsSync(partPath)) {
    // Удаление файла
    fs.unlinkSync(partPath);
    console.log(`Запчасть с ID ${id} была удалена.`);

    const updatedIndex = index.filter((part) => part.id !== id);
    fs.writeFileSync(indexPath, JSON.stringify(updatedIndex, null, 2));
  } else {
    console.error("Ошибка: Файл не найден.");
  }
};

const id = process.argv[2];

if (id) {
  deletePart(id);
} else {
  console.log("Использование: node delete.js <id запчасти>");
}