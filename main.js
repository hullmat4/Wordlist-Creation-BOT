const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const readline = require('readline');

var letters = /^[a-zA-Z]/;
var wordList = [];

function loadWordList() {
  let rl = readline.createInterface({
    input: fs.createReadStream('./word-list.txt'),
  });
  
  rl.on('line', (line) => {
    wordList.push(line.trimRight());
  });
  
  rl.on('close', () => {
    console.log('Ready!');
  });
}

function getWordList() {
  let message = '';
  wordList.forEach((word, index) => {
    if (index === wordList.length - 1) {
      message += (word.charAt(0).toUpperCase() + word.slice(1));
    } else {
      message += (word.charAt(0).toUpperCase() + word.slice(1)) + ', ';
    }
  });
  
  return message;
}
  
function addWord(command) {
  let word = getAfterCommand(command);
  if (word) {
    if (isValidWord(word)) {
      saveWord(word) 
      wordList.push(word);
      return true;
    }
  }
  
  return false;
}

function getAfterCommand(command) {
  let spaceIndex = -1;
  for (let i=0; i<command.length; i++) {
    if (command[i] === ' ') {
      spaceIndex = i;
      break;
    }
  }
  
  return spaceIndex === -1 || spaceIndex === command.length - 1 ? undefined : command.substring(spaceIndex + 1, command.length);
}
  
function saveWord(word) {
  fs.appendFileSync('./word-list.txt', word + '\n');
}
  
function isValidWord(word) {
  if (word.length <= 0) {
    return false;
  }
  
  if (!letters.test(word)) {
    return false;
  }
  
  return true;
}

client.once('ready', () => {
  loadWordList();
});

client.once('ready',() =>{
    console.log('Bot is online!');
});

client.login(''); // discord authenticaiton token here

client.on('message', message => {
    if (message.content === '!cmds') {
      message.channel.send('The following commands exist and all begin with \'!\' [ape, legostarwars, trevor, monkey [1-5], banana] For info on the scribbl.io function, type [!scribbl.io]');
      message.channel.send('The WORDLIST commands all begin with \'!\' [addword <word>, getwordlist] The addword command adds a word to the wordlist, getwordlist retrieves the list');
    }

    if (message.content === '!ape') {
      message.channel.send('This chat is now in ape mode!', {files: ['https://media.tenor.com/images/f4ae2b5537f7b3351e1675ec2a67e933/tenor.gif']});
    }

    if (message.content === '!legostarwars') {
      message.channel.send('https://www.youtube.com/watch?v=yAIul9wsWqA');
    }

    if(message.content === '!monkey1') {
      message.channel.send('monkey1', {files: ['https://media.tenor.com/images/73ec459bfabf89a52346b3d973326b30/tenor.gif']});
    }

    if(message.content === '!monkey2') {
      message.channel.send('haha funny monky', {files: ['https://media.tenor.com/images/41d7f2c168b8c5bf42754c869d578a68/tenor.gif']});
    }

    if(message.content === '!monkey3') {
      message.channel.send('monkey3', {files: ['https://media.tenor.com/images/bd1d3c3ff9b3629e41749fcb4a62ccf5/tenor.gif']});
    }

    if(message.content === '!monkey4') {
      message.channel.send('monkey4', {files: ['https://media.tenor.com/images/a1eec72a9a46c6aabe1b68402fcb423f/tenor.gif']});
    }

    if (message.content === '!test') {
      message.channel.send('test');
    }

    if (message.content === '!banana') {
      message.channel.send('bananas');
    }
  
    if (message.content === '!getwordlist' && message.channel.name === 'channel1') {
      const wordListStr = getWordList();
      message.channel.send(wordListStr);
    }
  
    if (message.content.startsWith('!addword ') && message.channel.name === 'channel1') {
      const response = addWord(message.content) ? 'Word sucessfully added' : 'There was an error please resend word';
      message.channel.send(response);
    }
  
    if (message.content.startsWith('!clearlist') && message.channel.name === 'channel1') {
      wordList = [];
      message.channel.send('word list cleared');
    }

});
