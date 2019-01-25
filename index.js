const Discord = require('discord.js');
const client = new Discord.Client();
const scheduler = require('node-schedule');

var sterowniaBota;
var ogolnyKanal;

client.on('ready', () => {
  sterowniaBota = client.channels.find(ch => ch.name === 'sterownia-bota');
  ogolnyKanal = client.channels.find(ch => ch.name === 'ogólny');

  if(!sterowniaBota || !ogolnyKanal)
  {
    console.log('kurwa');
    process.exit(-1);
  }
  sterowniaBota.send('cześć siema');
});

client.on('message', msg => {
  if(msg.channel.name === 'sterownia-bota' && msg.content === 'wyzywaj')
  {
    sterowniaBota.send('sie robi szefunciu');
    ogolnyKanal.send('jebac cie molski cwelu kurwa');
  }
});

client.login(process.env.token);

scheduler.scheduleJob('20 16 * * *', function(){
    ogolnyKanal.send('4:20 CHŁOPCY PALIMY!!!!!!!!!')
});