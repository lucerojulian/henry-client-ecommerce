const replaceChars = function replaceChars(text) {
  var newText = text.split("_").join(" ");
  newText = newText.charAt(0).toUpperCase() + newText.slice(1);
  return newText;
};

export default replaceChars;
