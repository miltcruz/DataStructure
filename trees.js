const readline = require('readline');

class FileNode {
  constructor(name, isFolder = false) {
    this.name = name;
    this.isFolder = isFolder;
    this.children = [];
  }

  addChild(node) {
    if (!this.isFolder) {
      throw new Error(`"${this.name}" is a file and cannot have children.`);
    }
    this.children.push(node);
  }

  print(indent = 0) {
    const prefix = ' '.repeat(indent * 2);
    const icon = this.isFolder ? '[DIR]' : '[FILE]';
    console.log(`${prefix}${icon} ${this.name}`);
    for (const child of this.children) {
      child.print(indent + 1);
    }
  }

  find(name) {
    if (this.name === name) return this;
    for (const child of this.children) {
      const result = child.find(name);
      if (result) return result;
    }
    return null;
  }
}

// --- Built-in test: two-level folder structure ---
const root = new FileNode('root', true);

const src = new FileNode('src', true);
src.addChild(new FileNode('index.js'));
src.addChild(new FileNode('utils.js'));

const assets = new FileNode('assets', true);
assets.addChild(new FileNode('logo.png'));
assets.addChild(new FileNode('style.css'));

root.addChild(src);
root.addChild(assets);
root.addChild(new FileNode('README.md'));

console.log('=== Initial folder structure ===');
root.print();
console.log();

// --- CLI ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

console.log('Commands:');
console.log('  add-folder <parentName> <folderName>   Add a folder under an existing node');
console.log('  add-file   <parentName> <fileName>     Add a file under an existing node');
console.log('  print                                   Print the full tree');
console.log('  find       <name>                      Find a node by name');
console.log('  exit                                    Quit');
console.log();

rl.prompt();

rl.on('line', (line) => {
  const parts = line.trim().split(/\s+/);
  const cmd = parts[0];

  switch (cmd) {
    case 'add-folder': {
      const [, parentName, folderName] = parts;
      if (!parentName || !folderName) {
        console.log('Usage: add-folder <parentName> <folderName>');
        break;
      }
      const parent = root.find(parentName);
      if (!parent) {
        console.log(`Node "${parentName}" not found.`);
      } else {
        try {
          parent.addChild(new FileNode(folderName, true));
          console.log(`Folder "${folderName}" added under "${parentName}".`);
        } catch (e) {
          console.log(e.message);
        }
      }
      break;
    }

    case 'add-file': {
      const [, parentName, fileName] = parts;
      if (!parentName || !fileName) {
        console.log('Usage: add-file <parentName> <fileName>');
        break;
      }
      const parent = root.find(parentName);
      if (!parent) {
        console.log(`Node "${parentName}" not found.`);
      } else {
        try {
          parent.addChild(new FileNode(fileName, false));
          console.log(`File "${fileName}" added under "${parentName}".`);
        } catch (e) {
          console.log(e.message);
        }
      }
      break;
    }

    case 'print':
      root.print();
      break;

    case 'find': {
      const [, name] = parts;
      if (!name) {
        console.log('Usage: find <name>');
        break;
      }
      const node = root.find(name);
      console.log(node ? `Found: ${node.isFolder ? '[DIR]' : '[FILE]'} ${node.name}` : `"${name}" not found.`);
      break;
    }

    case 'exit':
      rl.close();
      return;

    default:
      if (cmd) console.log(`Unknown command: "${cmd}"`);
  }

  rl.prompt();
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
