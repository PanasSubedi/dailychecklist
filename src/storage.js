const getNextID = object => {
  let lastIDs = localStorage.getItem('lastIDs');
  let idToReturn;
  if (lastIDs === null){
    idToReturn = '1';

    lastIDs = {}
    lastIDs[object] = '2';
  }

  else {
    lastIDs = JSON.parse(lastIDs);
    idToReturn = lastIDs[object];

    lastIDs[object] = (parseInt(lastIDs[object]) + 1).toString()
  }

  localStorage.setItem('lastIDs', JSON.stringify(lastIDs))

  return idToReturn;
}

const saveContent = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const getContent = key => {
  const data = localStorage.getItem(key);
  if (data === null){
    return data;
  }
  else {
    return JSON.parse(data);
  }
}


export { saveContent, getContent, getNextID };
