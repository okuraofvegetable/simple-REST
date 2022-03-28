const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}...`));

const users = [
    { user_id: 'TaroYamada', 
      password: 'PaSSwd4TY', 
      nickname: 'たろー', comment: '僕は元気です'},
];

app.post('/signup', (req, res) => {
  console.log(req.body);
  const user = {
    user_id: req.body.user_id,
    password: req.body.password
  };

  const res_success = {
    message: "Account successfully created",
    user: {
      user_id: user.user_id,
      nickname: user.user_id,
    }
  };

  let res_fail = {
    message: "Account creation failed",
    cause: ""
  };

  if (user.user_id === void 0 || user.password === void 0) {
    res_fail.cause = 'required';
    return res.status(404).send(res_fail);
  }


  if (user.user_id.length < 6 || user.user_id.length > 20 || user.password.length < 8 || user.password.length > 20) {
    res_fail.cause = 'length';
    return res.status(404).send(res_fail);
  }

  const regex = /^[a-zA-Z0-9]*$/;
  if (!user.user_id.match(regex)) {
    res_fail.cause = 'pattern';
    console.log(user.user_id);
    return res.status(404).send(res_fail);
  }

  for (var i = 0; i < user.password.length; i++) {
    const code = user.password.charCodeAt(i);
    if (code < 33 || code == 127 || isNaN(code)) {
      res_fail.cause = 'pattern';
      console.log(code);
      return res.status(404).send(res_fail);
    }
  }

  users.push(user);
  res.status(200).send(res_success);
});
