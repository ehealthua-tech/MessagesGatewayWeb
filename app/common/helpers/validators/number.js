const isNumber = value =>
  isNaN(parseInt(value, 10)) ? null : parseInt(value, 10);

export default isNumber;
