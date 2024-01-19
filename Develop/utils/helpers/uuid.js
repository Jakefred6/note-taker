// Function to generate a random UUID
function generateUUID() {
    // Math.random() generates a random number between 0 and 1
    // Multiply it by 0x10000 (65536) to shift the decimal places
    // Add 1 to ensure that the leading digit is never 0
    // Math.floor() rounds down to the nearest whole number
    const randomNumber = Math.floor((1 + Math.random()) * 0x10000);
  
    // Convert the random number to a hexadecimal string
    // toString(16) converts the number to base-16 (hex)
    // substring(1) removes the leading '0' from the hexadecimal string
    const hexString = randomNumber.toString(16).substring(1);
  
    return hexString;
  }
  
  // Export the generateUUID function for use in other modules
  module.exports = generateUUID;
  