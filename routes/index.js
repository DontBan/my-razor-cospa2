var express = require('express');
var router = express.Router();

const moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.headers.cookie && req.headers.cookie.includes('toCalc=')) {
    console.log(req.headers.cookie.split)
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

  // コスパを計算してメッセージをつくる
  // コスパを見て、替刃を替えるか判断するという流れなので
  // 当日は、今日から使い始めですね
  // 昨日ならば、1日使ったので1で値段を割る
  // 一昨日ならば、2日使ったので2で値段を割る
  let message = '';
  if (days === 0) {
    // 当日なら、コスパは替刃一本分のまま
    message = '今日から使い始めですね。';
  } else {
    const cospa = Math.round(toCalc.price / days);
    message = '昨日まで使って一日当たり' + cospa + '円です。';
  }

  // コスパと今日で何日目かと替刃の値段を渡す
  res.render('result', {
    title: 'ヒゲソリ替刃コスパ計算結果',
    message: message,
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
