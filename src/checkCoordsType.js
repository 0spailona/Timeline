export default function checkCoordsType(data) {
  data = data.trim()

  if (data.startsWith('[')) data = data.slice(1, data.length)

  if (data.endsWith(']')) data = data.slice(0, data.length - 1)
  console.log('data',data)
  let commas = 0;
  let spaces = 0;
  let commasIndex;
  let spaceIndex;
  for (let i = 0; i < data.length; i++) {
    console.log('i',data[i])
    if (data[i] === ',') {
      commas++;
      console.log('commas in for',commas)
      commasIndex = i;
      if (commas > 1) return {validate: false, msg: 'Check commas'};

      continue
    }

    if (data[i] === ' ') {
      if (data[i - 1] !== ',') return {validate: false, msg: 'Check commas and spaces'};
      spaceIndex = i;
      spaces++;
      continue
    }

    if (data[i] !== '.'
      && data[i] !== '-'
      && isNaN(parseInt(data[i]))) {
      return {validate: false, msg: 'Impossible symbols'}
    }
  }

  console.log('commas',commas)
  if (commas === 0) return {validate: false, msg: 'Check commas'}

  let latitudeStr = data.slice(0, commasIndex);

  const longitudeStr = spaces === 0 ? data.slice(commasIndex + 1, data.length) : data.slice(spaceIndex + 1, data.length);
  if (Math.abs(parseFloat(latitudeStr)) <= 180 && Math.abs(parseFloat(longitudeStr)) <= 180) return {
    validate: true,
    msg: undefined
  };
  return {validate: false, msg: 'Impossible coordinates'}
}
