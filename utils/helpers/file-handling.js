const fs = require("fs");

// Function to asynchronously read from a file and return a Promise
const readFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        // If there's an error reading the file, reject the Promise
        reject(err);
      } else {
        // If successful, resolve the Promise with the file data
        resolve(data);
      }
    });
  });
};

// Function to asynchronously write content to a file and log the result
const writeToFile = (filePath, content) => {
  fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) => {
    if (err) {
      // If there's an error writing to the file, log the error
      console.log(err);
    } else {
      // If successful, log a message indicating the data was written
      console.log(`\nData written to ${filePath}`);
    }
  });
};

// Function to read from a file, append content, and write back to the file
const readAndAppend = (content, filePath) => {
  readFromFile(filePath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(filePath, parsedData);
    })
    .catch((err) => console.log(err));
};

// Export the functions for use in other modules
module.exports = { readFromFile, writeToFile, readAndAppend };
