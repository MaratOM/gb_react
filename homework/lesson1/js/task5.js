function ajaxGetPromise(url) {
  return new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function() {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(new Error("Network error"));
    };

    req.send();
  });
}

function preparePromises(num) {
  let promise,
      promises = [];

  for(let i = 1; i <= num; i++) {
    promise = ajaxGetPromise('https://jsonplaceholder.typicode.com/posts/' + i);
    promises.push(promise);
  }

  return promises;
}

let promises = preparePromises(10);
Promise.all(promises)
  .then(data => console.log(data))
  .catch(data => console.log(data));