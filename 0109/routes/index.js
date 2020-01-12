const express = require('express');
const router = express.Router();
const postRouter = require('./post');

router.get('/', function(req, res, next) {
  res.status(200).send('hello!');
});

const print = (msg, time) => {
  setTimeout( ()=> {
    console.log(msg);
  }, time);
};

const waitPrint = (msg, time) => {
  return new Promise( resolve => {
    setTimeout( () => {
      console.log(msg);
      resolve();
    }, time);
  });
};


function test1(){
  print('a', 5000);
  print('b', 3000);
  print('c', 1000);
  throw new Error('error');
};

async function test2(){
  await waitPrint('a', 5000);
  await waitPrint('b', 3000);
  await waitPrint('c', 1000);
  throw new Error('error');
};

router.get('/async', async function(req, res, next) {
  try {
    test2();
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({msg: 'error occur!'});
});

router.use('/posts', postRouter);
router.use('/err', (req, res, next) => {
  next('error occurs!');
});

module.exports = router;
