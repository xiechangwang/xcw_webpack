import reind from './prind.js';
import './index.less';

reind();

const add = function add(a) {
  console.log(a + 3);
};

add(1);
const myPro = new Promise(((resolve) => {
  setTimeout(() => {
    resolve('123');
  }, 1000);
}));
myPro.then((res) => {
  console.log(res);
});
console.log('index.js undate');
