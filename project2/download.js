import {serialize} from 'https://cdn.skypack.dev/@jscad/stl-serializer';

// Downloads the given JSCAD model object as an STL file
const download = (name, model) => {
  debugger;
  const stlData = serialize({
    binary: false
  }, model);

  const a = document.createElement('a');
  a.href = `data:application/stl,${encodeURIComponent(stlData.join(''))}`;
  a.download = `${name}.stl`;

  a.click();
  a.remove();
}

export {
  download
}