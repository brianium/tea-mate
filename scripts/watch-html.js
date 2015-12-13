const watch = require('watch');
const path = require('path');
const fs = require('fs');

const directory = `${__dirname}/../`;
const root = path.resolve(directory);
const target = path.resolve(`${directory}/dist`);

/**
 * Script to just watch the index.html file and copy it. The watch command line
 * only supports watching a directory, and this allows watching a single file without
 * handling the others
 */
watch.watchTree(root, {
  filter(file) {
    return /tea-timer\/index\.html/.test(file);
  }
}, (file, curr, prev) => {
  if (typeof file === 'object' && prev === null && curr === null) {
    // finished
  } else if (prev === null) {
    // new file
  } else if (curr.nlink === 0) {
    // f was removed
  } else {
    fs.createReadStream(file).pipe(fs.createWriteStream(`${target}/index.html`));
  }
});
