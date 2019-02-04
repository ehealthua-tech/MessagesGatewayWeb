const isRequired = value => (parseInt(value, 10) >= 0 ? true : !!value);

export default isRequired;
