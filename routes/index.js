var express = require('express');
var router = express.Router();

const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ヒゲソリ替刃コスパ計算' });
});

router.post('/', function (req, res, next) {
  // ユーザーの入力を受け取って、オブジェクトに入れる
  const toCalc = {};
  if (req.body.button1) {
    toCalc.price = req.body.price1;
    // 今日の日付
    toCalc.start = moment().format('YYYY-MM-DD');
  } else {
    toCalc.price = req.body.price2;
    toCalc.start = req.body.date;
  }
  

  console.log(toCalc);

  // クッキーに入れる

  res.render('result', { title: 'ヒゲソリ替刃コスパ計算:結果' });
});

// 表示確認用
router.get('/result', function (req, res, next) {
  res.render('result', { title: 'ヒゲソリ替刃コスパ計算結果' });
});

module.exports = router;
