// Стили
import '~/styles/test.styles.scss';
import '~/styles/test.fonts.scss';

// Для работы с изоббрадениями и нейронками
import * as tf from '@tensorflow/tfjs';

// Для работы со страницей
import testImg from './models/test.jpg';

window.onload = () => {
  const rootNode = document.getElementById('root');

  const testImgNode = document.createElement('img');
  testImgNode.setAttribute('src', testImg);
  testImgNode.setAttribute('id', 'img');
  testImgNode.setAttribute('width', 224);
  testImgNode.setAttribute('height', 224);

  rootNode.append(testImgNode);

  // Загрузка модели
  predict(testImgNode);
};

async function predict(imageNode) {
  const model = await tf.loadLayersModel('/static/model/model.json');

  // Обратотка картины
  const offset = tf.scalar(127.5);
  const testPic = tf.browser.fromPixels(imageNode)
    .resizeNearestNeighbor([224, 224])
    .sub(offset).div(offset)
    .toFloat()
    .expandDims();

  const output = model.predict(testPic);
  console.log(await output.data());
}

// testImgNode.onload = function() {
//   cv['onRuntimeInitialized']= () => {
//     const imgSize = new cv.Size(224, 224);
//     const newImageArray = new cv.Mat();
//     const imageArray = cv.imread('img');
//     cv.resize(imageArray, newImageArray, imgSize, 0, 0, cv.INTER_AREA);
//     cv.imshow('outputCanvas', newImageArray);
//     console.log(newImageArray);
//     tf.keras.models.load_model(model);
//     console.log(reshape(newImageArray, [1, 224, 224, 3]));
//   };
// };