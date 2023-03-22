import {serialize} from 'https://cdn.skypack.dev/@jscad/stl-serializer@alpha';

// Downloads the given JSCAD model object as an STL file
const download = (name, model) => {
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