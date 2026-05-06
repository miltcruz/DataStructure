const fs  = require('fs');
const path = require('path');

const items = fs.readdirSync('C:\\', { withFileTypes: true });

console.log(items.map(item => ({
  name: item.name,
  type: item.isDirectory() ? 'folder' : 'file'
})));