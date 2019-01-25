"use strict";

const discord = require("discord.js");
const scheduler = require("node-schedule");
const cfg = require("./config.json");
const discordClient = new discord.Client();
const insultsCount = Object.keys(cfg.insults).length;

var sterowniaBota;
var ogolnyKanal;
var molski;

function randomInsult() {
    let num = Math.round(Math.random() * Math.floor(insultsCount - 1));
    return cfg.insults[num];
}

discordClient.on("ready", () => {
  sterowniaBota = discordClient.channels.find(
    ch => ch.name === "sterownia-bota"
  );
  ogolnyKanal = discordClient.channels.find(
      ch => ch.name === "ogólny"
  );
  molski = discordClient.users.find(
      u => u.id === "386462655189221376"
  );

  if (!sterowniaBota || !ogolnyKanal || !molski) {
    console.warn("o chuj xddd");
    process.exit(-1);
  }
  sterowniaBota.send("cześć siema");
});

discordClient.on("message", msg => {
  if (msg.author.id === molski.id)
    msg.reply(randomInsult());
  else {
    if (msg.channel.name === "sterownia-bota") {
      switch (msg.content) {
        case "wyzywaj":
          sterowniaBota.send("sie robi szefunciu");
          ogolnyKanal.send(molski.toString() + " " + randomInsult());
          break;
        default:
          break;
      }
    }
  }
});

discordClient.login(process.env.token);

scheduler.scheduleJob("20 16 * * *", function() {
  ogolnyKanal.send("4:20 CHŁOPCY PALIMY!!!!!!!!!");
});
