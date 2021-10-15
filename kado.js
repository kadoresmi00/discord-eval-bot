const { Client, MessageEmbed } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const kado = {
  sahip: "", // eval kullanabilecek id
  prefix: "", // botda eval denerken kullanılıcak prefix
  token: "" // bot token
};

client.on("message", async message => {
  if (!message.guild || (message.author.id !== kado.sahip)) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0].slice(kado.prefix.length);
  let embed = new MessageEmbed().setColor("2F3136").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setFooter("Kado Eval Bot").setTimestamp(); // eval de eğer embed kullanırsınız diye bunuda bıraktım.
  if (command === "eval" && message.author.id === kado.sahip) {
    if (!args[0]) return message.channel.send("Lütfen bir kod belirtiniz :tada:");
    let code = args.join(' ');
    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try {
      var evaled = clean(await eval(code));
      if (evaled.match(new RegExp(`${kado.token}`, 'g'))) evaled.replace(kado.token, `Token Paylaşılamaz.`);
      message.channel.send(`${evaled.replace(kado.token, `Token Paylaşılamaz.`)}`, { code: "js", split: true });
    } catch (err) { message.channel.send(err, { code: "js", split: true }) };
  };
});

client.login(kado.token).then(x => console.log(`Bot Connect : ${client.user.tag}`)).catch(err => console.error("Bot giriş yapamadı | Hata: " + err));
