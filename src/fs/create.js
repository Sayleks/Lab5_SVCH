// Импорт компонентов для работы node.js
const fs = require("fs");
const path = require("path");

const partsDir = path.join(__dirname, "parts");
const indexFile = path.join(partsDir, "parts_index.json");

fs.mkdirSync(partsDir, { recursive: true });

const createPart = (name, type, year, partNumber) => {
  const id = Date.now().toString();
  const filename = `part_${id}.json`;
  const partData = { id, name, type, year, partNumber };

  const partPath = path.join(partsDir, filename);

  if (fs.existsSync(partPath)) {
    console.error("Ошибка операции FS: Запись уже существует");
    return;
  }

  fs.writeFileSync(partPath, JSON.stringify(partData, null, 2));

  const index = fs.existsSync(indexFile)
    ? JSON.parse(fs.readFileSync(indexFile))
    : [];
  index.push({ id, name, type, year, filename });
  // null - не нужно использовать функцию замены
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

  console.log(`Запчасть "${name}" была успешно добавлена.`);
};

// Получаем аргументы командной строки
const [name, type, year, partNumber] = process.argv.slice(2);

if (name && type && year && partNumber) {
  createPart(name, type, year, partNumber);
} else {
  console.log("Использование: node create.js <название> <тип> <год> <номер детали>");
}