const CreateDB = require("./createdb");
const ImageTable = require("./imagetable");

const migrate = async () => {
  await CreateDB();
  await ImageTable();
};

migrate();
