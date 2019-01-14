const isNumber = value =>
  isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);

export default isNumber;
