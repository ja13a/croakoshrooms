import { loader, imagePlaceholder, startTip, endMushroomImage, endResults } from './elements.js';
import processFile from './processFile.js';

const rootNode = document.getElementById('root');

// Управление приложением
export default function startApp() {
  clearApp();
  rootNode.append(imagePlaceholder());
  rootNode.append(startTip());
}

function endScreen(result, mushroomImageNode) {
  clearApp();
  rootNode.append(endMushroomImage(mushroomImageNode));
  rootNode.append(endResults(result));
}

// Хэндлеры
/**
 * Создаёт input[type=file] подпиывает на изменения и при изменении обрабатывает файл
 */
export function uploadFileHandler() {
  const upload = document.createElement('input');
  upload.type = 'file';
  upload.accept = '.jpg, .jpeg, .png';

  upload.onchange = (e) => processFileHandler(e.currentTarget.files[0]);
  upload.click();
  upload.remove();
}

export function dropFileHandler(e) {
  e.preventDefault();
  processFileHandler(e.dataTransfer.items[0].getAsFile());
}

export function errorHandler() {
  startApp();
}

async function processFileHandler(file) {
  showLoader();

  const imageNode = readFile(file);
  const result = await processFile(imageNode);

  endScreen(result, imageNode);
}

// Хэлпер функции
function readFile(uploadedFile) {
  const fileType = uploadedFile.type.split('/')[0];
  const imageNode = document.createElement('img');

  // Если браузер поддерживает FileReader, есть загруженный файл и его тип изображение
  if (FileReader && uploadedFile && fileType === 'image') {
    const fr = new FileReader();

    fr.onload = () => {
      imageNode.src = fr.result;
    };

    fr.readAsDataURL(uploadedFile);
  }

  return imageNode;
}

function showLoader() {
  clearApp();
  rootNode.append(loader());
}

function clearApp() {
  rootNode.innerHTML = '';
}