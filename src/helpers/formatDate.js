function formatDate(fecha) {
  let converted = fecha.slice(0, 16);

  return converted.replace("T", " ");
}

export default formatDate;
