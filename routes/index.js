var express = require('express');
var router = express.Router();

const moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.headers.cookie && req.headers.cookie.includes('toCalc=')) {
    const toCalc = JSON.parse(req.headers.cookie.split('toCalc=')[1]);
    result(res, toCalc);
  } else {
    res.render('index', { title: 'ヒゲソリ替刃コスパ計算' });
  }
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
  res.setHeader('Set-Cookie', 'toCalc=' + JSON.stringify(toCalc) + ';expires=Mon, 07 Jan 2036 00:00:00 GMT;');

  result(res, toCalc);
});

// 表示確認用
router.get('/result', function (req, res, next) {
  res.render('result', { title: 'ヒゲソリ替刃コスパ計算結果' });
});

function result(res, toCalc) {
  console.log('resultページ');

  // 経過日数計算
  // yyyy-mm-ddで保存されている
  const from = moment(toCalc.start);
  // console.log(from.isValid());
  const to = moment();
  const days = Math.floor(moment.duration(to.diff(from)).asDays());
  // console.log(days);

  // コスパ計算
  const cospa = Math.round(toCalc.price / days);



  // コスパと今日で何日目かと替刃の値段を渡す
  res.render('result', {
    title: 'ヒゲソリ替刃コスパ計算結果',
    cospa: cospa,
    days: days,
    price: toCalc.price
  });
}

// cookieを削除してトップページにリダイレクト
router.post('/restart', function (req, res, next) {
  res.clearCookie('toCalc');

  res.redirect(req.baseUrl + '/');
});

module.exports = router;
