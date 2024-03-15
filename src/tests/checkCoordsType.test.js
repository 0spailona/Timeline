import checkCoordsType from "../checkCoordsType";

const checkCoordsListTrue = [
  ['1.50851, -0.12572'],
  ['51.50851,-0.12572'],
  ['[51.50851, -0.12572]'],
]

const handlerTrue = test.each(checkCoordsListTrue);
handlerTrue('Should return true for coords %i',(coords) => {
  const result = checkCoordsType(coords);
  expect(result.validate).toBe(true)
})


const checkCoordsListFalse = [
  ['1.50851 -0.12572','Check commas and spaces'],
  ['1,50851, -0,12572','Check commas'],
  ['1.50851  -0.12572','Check commas and spaces'],
  ['1.5j851, -0.12572','Impossible symbols'],
  ['190.50851, -0.12572','Impossible coordinates'],
  ['[]','Check commas'],
]

const handlerFalse = test.each(checkCoordsListFalse);
handlerFalse('Should return false and msg for coords %i',(coords,msg) => {
  const result = checkCoordsType(coords);
  expect(result.validate).toBe(false);
  expect(result.msg).toBe(msg);
})
