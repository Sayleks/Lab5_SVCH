const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "parts.json");

const writeDataToFile = (newPartData) => {
  // Читаем текущее содержимое файла
  fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      return;
    }

    let parts = [];

    // Если файл не пустой, парсим его содержимое
    if (data) {
      try {
        parts = JSON.parse(data);
      } catch (parseError) {
        console.error("Ошибка при парсинге JSON:", parseError);
        return;
      }
    }

    // Добавляем новые данные
    parts.push(...newPartData);

    // Записываем обновленный массив обратно в файл
    fs.writeFile(filePath, JSON.stringify(parts, null, 2), (writeError) => {
      if (writeError) {
        console.error("Ошибка при записи файла:", writeError);
      } else {
        console.log("Запись завершена.");
      }
    });
  });
};

const newParts = [
  {
    id: Date.now(),
    name: "Brake Pad",
    type: "Brakes",
    year: 2022,
    partNumber: "BP123456",
  },
  {
    id: Date.now() + 1,
    name: "Oil Filter",
    type: "Engine",
    year: 2021,
    partNumber: "OF654321",
  },
];

// Вызываем функцию для записи данных
writeDataToFile(newParts);