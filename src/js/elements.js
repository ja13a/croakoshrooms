import startApp, { uploadFileHandler, dropFileHandler } from './main';

export function imagePlaceholder() {
  const imageField = imageDownloadField();
  imageField.append(browseFileButton());

  return imageField;
}

export function startTip() {
  const tip = document.createElement('div');
  tip.innerText += 'Чтобы определить гриб выберите изображение с помощью панели справа';
  tip.classList.add('app__start-tip');

  const arrowLeft = document.createElement('div');
  arrowLeft.classList.add('arrow-left-icon');
  tip.append(arrowLeft);

  return tip;
}

export function endMushroomImage(mushroomImageNode) {
  const mushroomImageContainer = document.createElement('div');
  mushroomImageContainer.classList.add('result__image-container');

  mushroomImageNode.classList.add('result__image');
  mushroomImageContainer.append(mushroomImageNode);

  return mushroomImageContainer;
}

export function endResults(results) {
  const resultsContainer = document.createElement('div');
  resultsContainer.classList.add('result__data-container');

  const resultTitle = document.createElement('span');
  resultTitle.classList.add('result__result-title');
  resultTitle.innerText = 'Результаты: ';
  resultsContainer.append(resultTitle);

  results.forEach(result => resultsContainer.append(resultItem(result)));

  const restartButton = document.createElement('button');
  restartButton.classList.add('result__restart-button');
  restartButton.classList.add('button');
  restartButton.innerText = 'Попробывать снова';
  restartButton.onclick = () => startApp();

  resultsContainer.append(restartButton);

  return resultsContainer;
}

/**
 * Функция возварщает один элемент предсказания нейросети
 * @param {[number, string, string]} data Данные в формате [вероятность, латинское название, название на русском]
 */
function resultItem(data) {
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('result__item-container');

  const resultProbability = document.createElement('span');
  resultProbability.classList.add('result__item-probability');
  resultProbability.innerText = `${data[0]}%`;
  itemContainer.append(resultProbability);

  const mushroomTitle = document.createElement('span');
  mushroomTitle.classList.add('result__item-title');
  mushroomTitle.innerText = data[2];
  itemContainer.append(mushroomTitle);

  itemContainer.append(document.createElement('br'));

  const mushroomTitleLat = document.createElement('span');
  mushroomTitleLat.classList.add('result__item-lat-titel');
  mushroomTitleLat.innerText = `(${data[1]})`;
  itemContainer.append(mushroomTitleLat);

  itemContainer.append(resultLinks(data[1]));

  return itemContainer;
}

function resultLinks(latTitle) {
  const linksContainer = document.createElement('div');
  linksContainer.classList.add('result__links-container');

  const wikiLink = document.createElement('a');
  wikiLink.href = `https://ru.wikipedia.org/wiki/${latTitle}`;
  wikiLink.target = '_blank';
  wikiLink.classList.add('result__icon-link');
  wikiLink.classList.add('wikipedia-icon');
  linksContainer.append(wikiLink);

  const googleLink = document.createElement('a');
  googleLink.href = `https://www.google.com/search?&q=${latTitle}`;
  googleLink.target = '_blank';
  googleLink.classList.add('result__icon-link');
  googleLink.classList.add('google-icon');
  linksContainer.append(googleLink);

  const mushroomObserverLink = document.createElement('a');
  mushroomObserverLink.href = `https://mushroomobserver.org/observer/observation_search?pattern=${latTitle}`;
  mushroomObserverLink.target = '_blank';
  mushroomObserverLink.classList.add('result__icon-link');
  mushroomObserverLink.classList.add('mushroom-observer-icon');
  linksContainer.append(mushroomObserverLink);

  return linksContainer;
}

export function loader() {
  const loaderContainer  = document.createElement('div');
  loaderContainer.classList.add('app__loader-container');

  const loader = document.createElement('div');
  loader.classList.add('loader');
  loaderContainer.append(loader);

  return loaderContainer;
}

function imageDownloadField() {
  const imageDragAndDrop = document.createElement('div');
  imageDragAndDrop.classList.add('app__image-placeholder');

  imageDragAndDrop.ondrop = (e) => dropFileHandler(e);
  imageDragAndDrop.ondragover = (e) => e.preventDefault();
  imageDragAndDrop.ondragenter = (e) => e.currentTarget.dataset.drag = true;
  imageDragAndDrop.ondragleave = (e) => e.currentTarget.dataset.drag = false;

  const imageFileIcon = document.createElement('div');
  imageFileIcon.classList.add('image-file-icon');
  imageDragAndDrop.append(imageFileIcon);

  const dragAndDropText = document.createElement('span');
  dragAndDropText.innerText = 'Перетащите изоюражение сюда';
  dragAndDropText.classList.add('app__drag-and-drop-text');
  imageDragAndDrop.append(dragAndDropText);

  const orText = document.createElement('span');
  orText.innerText = 'или';
  orText.classList.add('app__drag-and-drop-text');
  imageDragAndDrop.append(orText);

  return imageDragAndDrop;
}

function browseFileButton() {
  const browseFileButton = document.createElement('button');
  browseFileButton.classList.add('app__browse-file-button');
  browseFileButton.classList.add('button');
  browseFileButton.innerText = 'Выберите файл';

  browseFileButton.addEventListener('click', () => uploadFileHandler());

  return browseFileButton;
}