const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the filename: ', (filename) => {
  rl.question('Enter the word to remove: ', (word) => {
    const filePath = path.resolve(filename); 

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading the file ${filePath}:`, err);
        rl.close();
        return;
      }

      
      const modifiedContent = data.replace(new RegExp('\\b' + word + '\\b', 'gi'), '');

      fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing to the file ${filePath}:`, err);
        } else {
          console.log(`Successfully removed all occurrences of '${word}' from ${filePath}.`);
        }
        rl.close();
      });
    });
  });
});
