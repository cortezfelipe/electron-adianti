// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
///var path = require('path');
// var userName = process.env['USERPROFILE'].split(path.sep)[2];
// var loginId = path.join("domainName",userName);
// console.log(userName);
//document.write(userName)
console.log(process.platform) 
})


