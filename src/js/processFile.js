import * as tf from '@tensorflow/tfjs';
import { errorHandler } from './main';
import { classes } from '../static/data/modelClasses.js';

export default async function processFile(imageNode) {
  const result = (await predict(imageNode));

  // Выбираем 3 самых вероятных гриба собираем массив массивов типа [56.12, Russula, Маслёнок]
  const outputArr = Array.from(result)
    .map((el, i) => [Math.floor(+el * 10000) / 100, classes[i][0], classes[i][1]])
    .sort((a, b) => b[0] - a[0])
    .slice(0, 3);

  return outputArr;
}

async function predict(imageNode) {
  const model = await tf.loadLayersModel('/static/model/model.json');

  try {
    const offset = tf.scalar(127.5);
    const testPic = tf.browser.fromPixels(imageNode)
      .resizeNearestNeighbor([224, 224])
      .sub(offset).div(offset)
      .toFloat()
      .expandDims();

    const output = model.predict(testPic);
    const result = await output.data();

    return result;
  } catch (error) {
    errorHandler();
  }
}