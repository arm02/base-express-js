const { pino } = require("pino");

module.exports = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: "pino/file",
        level: "error",
        options: { destination: "./logs/error.log", mkdir: true },
      },
    ],
  },
});
