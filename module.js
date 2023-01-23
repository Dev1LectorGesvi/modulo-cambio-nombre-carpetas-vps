const http = require('http');
const schedule = require("node-schedule")

schedule.scheduleJob("0 0 0 * * *", async function () {
  // Se va a ejecutar todos los días a las 00:00:00
  console.log("Cambiando nombre de carpeta!");
  http
    .get("http://emprenet.org/update/script.php", (res) => {
      const headerDate =
        res.headers && res.headers.date ? res.headers.date : "no response date";
      console.log("Status Code:", res.statusCode);
      console.log("Date in Response header:", headerDate);

      res.on("data", (chunk) => {
        console.log("data: ", chunk.toString());
      });

      res.on("end", () => {
        console.log("Conexion close");
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });
});
