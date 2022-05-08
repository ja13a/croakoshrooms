// Стили
import '~/styles/styles.index.scss';

// Для работы с изоббрадениями и нейронками
import * as tf from '@tensorflow/tfjs';

// Для работы со страницей
import testImg from './models/test.jpg';

window.onload = () => {
  const rootNode = document.getElementById('root');
  rootNode.append(imagePlaceholder());
  rootNode.append(startTip());

  // const testImgNode = document.createElement('img');
  // testImgNode.setAttribute('src', testImg);
  // testImgNode.setAttribute('id', 'img');
  // testImgNode.setAttribute('width', 224);
  // testImgNode.setAttribute('height', 224);

  // rootNode.append(testImgNode);

  // // Загрузка модели
  // predict(testImgNode);
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

function imagePlaceholder() {
  const imageDragAndDrop = document.createElement('div');
  imageDragAndDrop.classList.add('app__image-placeholder');

  const imageFileIcon = document.createElement('div');
  imageFileIcon.classList.add('image-file-icon');
  imageDragAndDrop.append(imageFileIcon);

  const dragAndDropText = document.createElement('span');
  dragAndDropText.innerText = 'Drag & Drop image here';
  dragAndDropText.classList.add('app__drag-and-drop-text');
  imageDragAndDrop.append(dragAndDropText);

  const orText = document.createElement('span');
  orText.innerText = 'or';
  orText.classList.add('app__drag-and-drop-text');
  imageDragAndDrop.append(orText);

  const browseFileButton = document.createElement('button');
  browseFileButton.classList.add('app__browse-file-button');
  browseFileButton.innerText = 'Browse files';
  browseFileButton.addEventListener('click', (e) => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.accept = '.jpg, .jpeg, .png';

    upload.onchange = (e) => {
      console.log(e.currentTarget.files[0]);
      // Дальше стирание #root и вызов функции по созданию вывод нейронки вроде result(img)
    }

    upload.click();
  });
  imageDragAndDrop.append(browseFileButton);

  return imageDragAndDrop;
}

function startTip() {
  const tip = document.createElement('div');
  tip.innerText += 'To identify a mushroom, select a image in the panel';
  tip.classList.add('app__start-tip');

  const arrowLeft = document.createElement('div');
  arrowLeft.classList.add('arrow-left-icon');
  tip.append(arrowLeft);

  return tip;
}