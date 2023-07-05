

import { render } from './io/render.js';
import { model, name as modelName} from './model.js';
import { download } from './io/download.js';

const theModel = model({ scale: 1 });

// Set the name input to the model name
document.getElementById('name').value = modelName;

document.getElementById('download').addEventListener('click', () => {
  const nameInput = document.getElementById('name');

  const time = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  .replace(/:/g, '-')
  .replace(/, ?/g, '_')
  .replace(/ /g, '-')

  download(`${nameInput.value}_${time}`, theModel);
});

render(document.getElementById("jscad"), [
  theModel
]);

