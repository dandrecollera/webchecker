const CreateDB = require("./createdb");
const ImageTable = require("./imagetable");
const UserTable = require("./usertable");

const migrate = async () => {
  await CreateDB();
  await ImageTable();
  await UserTable();
};

migrate();
