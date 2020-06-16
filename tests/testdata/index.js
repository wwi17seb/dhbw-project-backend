const fs = require('fs');

fs.readdir(__dirname, (err, files) => {
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    if (file === __filename.substring(__dirname.length + 1)) {
      continue;
    }
    exports[file.substring(0, file.length - 3)] = require(`./${file}`);
  }
});
