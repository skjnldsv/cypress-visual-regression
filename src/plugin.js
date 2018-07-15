const path = require('path');

const imageDiff = require('image-diff');

// TODO: allow user to define/update via cypress config variables
const SNAPSHOT_DIRECTORY = process.env.SNAPSHOT_DIRECTORY || path.join(
  __dirname, '..', '..', '..', 'cypress', 'snapshots',
);

module.exports = (on, config) => {
  on('after:screenshot', (details) => {
    // run visual tests
    if (config.env.type === 'actual' && !details.testFailure) {
      return new Promise((resolve, reject) => {
        const options = {
          actualImage: path.join(SNAPSHOT_DIRECTORY, 'actual', details.specName, `${details.name}.png`),
          expectedImage: path.join(SNAPSHOT_DIRECTORY, 'base', details.specName, `${details.name}.png`),
          diffImage: path.join(SNAPSHOT_DIRECTORY, 'diff', details.specName, `${details.name}.png`),
        };
        imageDiff(options, (err, imagesAreSame) => {
          if (err) return reject(err);
          if (!imagesAreSame) return reject(new Error(`${details.name} images are different`));
          return resolve(imagesAreSame);
        });
      });
    }
    return null; // TODO refactor
  });
};
