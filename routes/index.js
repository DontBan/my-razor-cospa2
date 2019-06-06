var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ヒゲソリ替刃コスパ計算' });
});

router.post('/', function (req, res, next) {
  // ユーザーの入力を受け取って、クッキーに入れる
  res.render('result', { title: 'ヒゲソリ替刃コスパ計算:結果' });
});

// 表示確認用
router.get('/result', function (req, res, next) {
  res.render('result', { title: 'ヒゲソリ替刃コスパ計算結果' });
});

module.exports = router;
