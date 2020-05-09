import './index.less';

const add = (a) => {
  console.log(a + 3);
};

add(1);


const myPro = new Promise((resolve) => {
  setTimeout(() => {
    resolve('123');
  }, 1000);
});
myPro.then((res) => {
  console.log(res);
});
