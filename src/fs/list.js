const fs = require("fs");
const path = require("path");

const listParts = () => {
  const indexPath = path.join(__dirname, "parts", "parts_index.json");

  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath));
    console.log("Список всех запчастей:");
    index.forEach((part) => {
      console.log(`${part.id}: ${part.name} (${part.type}, Год: ${part.year})`);
    });
  } else {
    console.log("Записей нет.");
  }
};

listParts();