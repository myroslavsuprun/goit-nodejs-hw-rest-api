const Jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');

/**
 * Resizes image, then writes it in tje new directory and removes in the old one.
 *
 * @async
 *
 * @param {string} imagePath - current image path (including file name);
 * @param {string} movePath  - path where the updated image must be moved;
 * @param {string} imageName - image name;
 * @returns resized image directory path (including file name).
 */
async function resizeAndMoveImage(imagePath, movePath, imageName) {
  const image = await Jimp.read(imagePath);
  const resizedImage = await image.resize(250, 250);
  await resizedImage.writeAsync(path.join(movePath, imageName));

  await fs.unlink(imagePath);

  return path.join(movePath, imageName);
}

module.exports = resizeAndMoveImage;
