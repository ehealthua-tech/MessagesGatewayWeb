const isNumber = value => (isNaN(parseInt(value, 10)) ? value : validate(value));

export default isNumber;
