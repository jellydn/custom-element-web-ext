'use strict';

function loadRes(res, type = 'html') {
  return new Promise(
    function (resolve, reject) {
      var link;
      if (type === 'js') {
        link = document.createElement('script');
        link.setAttribute('src', res);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', 'import');
        link.setAttribute('href', res);
      }
      link.onload = function () {
        resolve(res);
      };
      link.onerror = function (error) {
        reject(error)
      }
      document.head.appendChild(link);
    });
}

loadRes(chrome.extension.getURL('bower_components/webcomponentsjs/webcomponents-loader.js'), 'js')
  .then(loadRes(chrome.extension.getURL('bower_components/polymer/polymer.html')))
  .then(loadRes(chrome.extension.getURL('bower_components/iron-icons/iron-icons.html')))
  .then(loadRes(chrome.extension.getURL('elements/icon-toggle.html')))
  .then(function () {
    // code that depends on web components 
    console.log('Load polymer is ready');
    const toggleIcon = document.createElement('div');
    toggleIcon.innerHTML = '<icon-toggle toggle-icon="star"></icon-toggle>';
    document.body.appendChild(toggleIcon);
  }).catch(function (error) {
    console.warn('found erorr', error);
  });


console.log('\'Allo \'Allo! Content script');
