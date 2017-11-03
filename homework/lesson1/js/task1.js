let sum = function() {
  return 5 + 5;
};

let multilple = function() {
  return 5 * 5;
};

function loop(times = 0, callback = null) {
  if(times > 0 && callback !== null) {
    for(let i = 0; i < times; i++) {
      let data = callback();
      console.log(data);
    }
  }
}


console.log("** Called loop(4, sum)");
loop(4, sum);
console.log("** Called loop(3, multilple)");
loop(3, multilple);
