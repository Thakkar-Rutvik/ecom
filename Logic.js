// // ********* callback and HOF function *************

// // function meet(fun) {
// //   fun();
// // }
// // function rutvik() {
// //   console.log("rutvik called");
// // }

// // meet(rutvik);

// //*************** arrow function **************

// // const meet = () => "meet desai";

// // let res = meet();
// // console.log("🚀 ~ res:", res);

// // *********** anonynouse function *********************

// // A function without any name

// // const meet = function () {
// //   console.log("meet desai");
// // };
// // meet();

// // IIFE
// // (() => {
// //   console.log("meet desai");
// // })();

// // ****************** promise chaining ******************

// // let api1 = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve("api1 called");
// //   }, 2000);
// // });
// // let api2 = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve("api2 called");
// //   }, 2000);
// // });
// // let api3 = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve("api3 called");
// //   }, 2000);
// // });
// // let api4 = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve("api4 called");
// //   }, 2000);
// // });
// // let api5 = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve("api5 called");
// //   }, 2000);
// // });

// // api1
// //   .then((res) => {
// //     console.log(res);
// //     return api2;
// //   })
// //   .then((res) => {
// //     console.log(res);
// //     return api3;
// //   })
// //   .then((res) => {
// //     console.log(res);
// //     return api4;
// //   })
// //   .then((res) => {
// //     console.log(res);
// //     return api5;
// //   })
// //   .then((res) => {
// //     console.log(res);
// //   });

// // for loop

// // let test = [80, 25, 30];

// // let result = test.map((ele, i) => {
// //   return ele * 10;
// // });

// // for (let i = 0; i < test.length; i++) {
// //   test[i] = "test";
// // }

// // console.log(result);
// // console.log(test);

// // filter

// // let test = [80, 25, 30, 50, 9695, 98, 65, 565, 8, 965];

// // let test2 = test.filter((ele, i) => {
// //   return ele >= 100;
// // });

// // console.log(test2);
// // console.log(test);

// // reduce

// // let test = [1, 2, 3, 4, 5];

// // let test2 = test.reduce((acc, cv) => {
// //   console.log(acc, "-", cv);
// //   return acc + cv;
// // });

// // console.log(test2);
// // console.log(test);

// // find

// // let test = [80, 25, 300, 50, 9695, 98, 65, 565, 8, 965];

// // let test2 = test.find((ele, i) => {
// //   return ele > 100;
// // });

// // console.log(test2);

// // includes

// // let test = [80, 25, 300, 50, 9695, 98, 65, 565, 8, 965];

// // let test2 = test.includes(50);

// // console.log(test2);

// // if (test.includes(50000)) {
// //   console.log(true);
// // } else {
// //   console.log(false);
// // }

// // object this method

// // let obj = {
// //   test1: "hi",
// //   test2: "hello",
// //   test3: "namaste",
// //   test4: "hola",
// //   fun: function () {
// //     console.log(this.test1);
// //   },
// // };

// // obj.fun();

// // Hoisting

// // rutvik();

// // let rutvik = function () {
// //   console.log("fun called");
// // };

// // const num = [1, 2, 3];

// // // num[0] = 0;

// // // num.push(4);

// // num = "test00000";

// // console.log(num);

// // lexical env and closer

// // function xyz() {
// //   let i = 11;
// //   function abc() {
// //     let j = 2.2;
// //     function mno() {
// //       let k = 22;
// //       console.log(i);
// //     }
// //     mno();
// //   }
// //   abc();
// // }
// // xyz();

// // callback hell

// function xyz() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("cart");
//     }, 2000);
//   });
// }

// function abc() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Payment");
//       // reject("payment failed");
//     }, 5000);
//   });
// }

// function mno() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // resolve("Success");
//       reject("Somthing went wrong!");
//     }, 5000);
//   });
// }

// function ijk() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Thank you");
//     }, 5000);
//   });
// }

// // xyz(() => {
// //   return abc(() => {
// //     return mno(() => {
// //       return ijk();
// //     });
// //   });
// // });

// xyz()
//   .then((res) => {
//     console.log(res);
//     return abc();
//   })
//   .then((res) => {
//     console.log(res);
//     return mno();
//   })
//   .then((res) => {
//     console.log(res);
//     return ijk();
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
