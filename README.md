INSTALACION DEL BOT

Este bot de telegram programado con Js (Es6) usa distintas librerias para instalarlas correctamente sigue los siguientes pasos:

- Clone del repositorio usando el HTTPS: https://github.com/Woxstone/Bot-Telegram-Gastos.git

- npm install 

- Crear archivo .env en la carpeta raiz.

El bot token te lo da TheBotFather cuando creas tu bot.

BOT_TOKEN = ""

DATA_FILE_EXPENSES = "./data/ledger.json"

DATA_FILE_USERS = "./data/roster.json"

DATA_FILE_LOGGER = "./data/logger.json"

OPCIONAL

- Crea una app desde aqui [https://my.telegram.org/auth](https://my.telegram.org/auth) rellena con la info que tienes estos campos en tu archivo .env

Tu eres en userone necesitas otra cuenta de telegram para poder hacer el test con dos usuarios hablando en el mismo chat.

- Poner estas nuevas variables en el .env

API_ID_userone = ""

API_HASH_userone = ""

Descomenta la linea 32 y 33 para conseguir el STRING_SESSION_userone y vuelve lo a comentar si no quieres que te salga todo el rato.

STRING_SESSION_userone = ""

API_ID_usertwo = ""

API_HASH_usertwo = ""

STRING_SESSION_usertwo = ""

Es el nombre del chat donde quieres que se manden los mensajes, si esto no funciona puedes poner el id del chat que lo pudes sacar de dos formas o por la URL (https://community.jamaicans.dev/t/get-the-telegram-channel-id/427) o en el ctx.

NAME_OF_BOT_CHANNEL = ""

Para correr los test de integraccion escribe en la terminal:  npm run integrationTest

-Scripts:

npm run start

npm run test

npm run integrationTest
