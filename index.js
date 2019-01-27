'use strict';

const discord = require('discord.js');
const schedule = require('node-schedule');
const isNumber = require('is-number');
const cfg = require('./config.json');

const discordClient = new discord.Client();
const insultsCount = Object.keys(cfg.insults).length; // liczba obelg
const czterdwazeroCount = Object.keys(cfg.fourtwenty).length; // :)
const zamknijmordeCount = Object.keys(cfg.shutup).length; // itd

var ogolnyKanal;
var molski;

function randomInt(max) {
  return Math.round(Math.random() * Math.floor(max)); // generuje losowa liczbe calkowita z przedzialu 0-max
}

discordClient.on('ready', () => {
  ogolnyKanal = discordClient.channels.find(ch => ch.name === 'ogólny'); // szuka ogolnego
  molski = discordClient.users.find(u => u.id === '386462655189221376'); // szuka molskiego

  if (!ogolnyKanal || !molski) {
    console.warn('o chuj xddd'); // jak nie znajdzie to przypix
    process.exit(-1);
  }
});

discordClient.on('message', msg => {
  if (msg.author.id === molski.id) {
    if (msg.content !== 'wyzywaj') {
      // nie robimy to czego chce molski
      msg.reply(cfg.shutup[randomInt(zamknijmordeCount - 1)]); // odpowiada molskiemu jak cos napisze
    }
  } else {
    // ktos inny niz molski
    if (!msg.content.startsWith('wyzywaj') || msg.author.bot) return;

    if (msg.content === 'wyzywaj') {
      ogolnyKanal.send(
        molski.toString() + ' ' + cfg.insults[randomInt(insultsCount - 1)] // bot wyzywa na ogolnym
      );
    } else {
      let cmd = msg.content.split(/ +/);
      if (isNumber(cmd[1])) {
        let num = parseInt(cmd[1]);
        if (num < 0) return;
        if (num > 10) {
          ogolnyKanal.send('max 10 kurwa');
          return;
        } // max 10 zeby kogos nie popierdolilo i nie bot dostal bana
        for (var i = 0; i < num; i++) {
          setTimeout(() => {
            ogolnyKanal.send(
              molski.toString() + ' ' + cfg.insults[randomInt(insultsCount - 1)]
            );
          }, 1250 * i);
        }
      }
    }
  }
});

discordClient.login(process.env.token); // tajne info

// wyzywa molskiego co 45 minut
schedule.scheduleJob('*/45 * * * *', () => {
  ogolnyKanal.send(
    molski.toString() + ' ' + cfg.insults[randomInt(insultsCount - 1)]
  );
});

// :)
schedule.scheduleJob('0 20 16 * * *', () => {
  ogolnyKanal.send(cfg.fourtwenty[randomInt(czterdwazeroCount - 1)]);
});
