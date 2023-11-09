const WebSocket = require('ws');

const keywords = {
'forest': ['https://ibb.co/6JP5pz3’,
https://ibb.co/4TsDfn6’,
https://ibb.co/2KRS2gx’],
'field': [‘https://ibb.co/2YGz5W2’, 
  ‘https://ibb.co/1bqBXz2’, 
  'https://ibb.co/FYRPxxR jpg'],
'village': [' https://ibb.co/LSr3g2N’,
‘https://ibb.co/dftVNqT’,
‘https://ibb.co/QkPSfvt’]
};

let MaxThreadCount = 9; 
const server = new WebSocket.Server({ port: 5020 });
console.log("Сервер запущен. Порт 5020");

server.on('connection', (socket) => 
{
  console.log("Пользователь подключился");
  let threadCount = 0; 

  socket.on('message', (keyword) => 
  {
    console.log(`Получено ключевое слово: ${keyword}`);
    const urls = keywords[keyword];
    if (threadCount < MaxThreadCount) 
    {
      threadCount++;

      if (urls) 
      {
        socket.send(JSON.stringify(urls));
      } 
      else 
      {
        socket.send(JSON.stringify(new String('empty')));
      }

      console.log("Запуск потока");
    }
    else 
    {
      console.log('Заняты все  потокы');
    }
  });

  socket.on('close', () => 
  {
    console.log('Пользователь отключился');
  });
});
