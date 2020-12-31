const consoleLog = console.log;

console.log = (data, isDetail) => {
  if (!isDetail) {
    consoleLog(data);
    return;
  }
  if (typeof data === 'object' && isDetail === true ) {
    const { res } = convertObj2Str(data, [0]);
    consoleLog(res);
    return;
  }
  consoleLog(data);
}

const generateRepeatStr = (lineNum, s) => {
  let str = '';
  for (let i = 0; i < lineNum; i++) {
    str += s;
  }
  return str;
}

const generateSpaceStr = (spaceArr) => {
  if (spaceArr.length === 1) {
    return '|';
  }
  let str = '';
  let preSpaceNum = 0
  for (let i = 0; i < spaceArr.length; i++) {
    const spaceNumber = spaceArr[i];
    const s = generateRepeatStr(spaceNumber - preSpaceNum, ' ')
    preSpaceNum = spaceNumber;
    str += s + '|';
  }
  return str;
}

const convertObj2Str = (data, space) => {
  let str = '';
  let lineStr = '';
  const keysArr = Object.keys(data);
  keysArr.forEach((key) => {
    let item = data[key];
    let resData;
    let lineNum = 2;
    const curSpace = space.slice(-1)[0]
    let spaceStr = generateSpaceStr(space);
    if (typeof item === 'object') {
      const spaceCopy = space.slice();
      spaceCopy.push(curSpace + key.length + 4)
      let { res } = convertObj2Str(item, spaceCopy);
      resData = res;
      lineNum = -1;
    }
    lineStr = generateRepeatStr(2, '\n'+ spaceStr);
    str += `${lineStr}--${key}: ${resData
      || `${typeof item === 'string' ? "\""+ item +"\"" : item}`}`;      
  });
  return {
    res: str,
  };
}
