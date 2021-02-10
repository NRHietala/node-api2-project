const server = require("./api/server");
const PORT = 5678;

server.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
