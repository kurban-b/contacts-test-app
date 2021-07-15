const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  static: "./build",
});

const users = router.db.get("users");
const contacts = router.db.get("contacts");

server.use(middlewares);
server.use(jsonServer.bodyParser);

//Авторизация
server.post("/auth", (req, res) => {
  const { login, password } = req.body;
  const authUser = users
    .toJSON()
    .find((user) => user.login === login && user.password === password);
  if (authUser === undefined) {
    res.status(404).json({ message: "Ошибка авторизации" });
  } else {
    res.json({ ...authUser, password: null });
  }
});

//Проверка токена
const authRecruiter = (req, res, next) => {
  const user = users.toJSON().find((item) => item.token === req.headers.token);
  if (!user) {
    res.status(400).json({ message: "Ошибка доступа. Токен не подходит" });
  } else {
    req.user = user;
    next();
  }
};

//Получение отфильтрованных контактов
server.get("/contacts", authRecruiter, (req, res) => {
  const filteredСontacts = contacts.filter(
    (contact) => contact.userId === req.user.id
  );
  if (filteredСontacts.toJSON().length === 0) {
    res.status(404).json([]);
  }
  res.json(filteredСontacts);
});

server.use(router);
server.listen(process.env.PORT || 5000, () => {
  console.log(`SERVER STARTED ON PORT: ${process.env.PORT || 5000}`);
});
