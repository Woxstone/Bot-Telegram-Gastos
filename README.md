INSTALACION DEL BOT

Este bot de telegram programado con Js (Es6) usa distintas librerias para instalarlas correctamente sigue los siguientes pasos:

-Clone del repositorio usando el HTTPS

- npm install para descargar las librerias

Para hacer que node funcione con Es6 hay que instalar babel

- npm init

- npm install --save-dev @babel/preset-env

- npm install --save-dev @babel/node

-crea un  archivo llamado   .babelrc

escribe esto dentro:

{
"presets": ["@babel/preset-env"]
}

Hay que modificar el pack-json para que tire babel cuando escribimos en la terminal npm run start:

"scripts": {
"test": "echo "Error: no test specified" && exit 1""jest,
"start": "npx babel-node app.js"
},

cambia lo que haya en start por:  npx babel-node app.js

Ahora instalamos jest:

- npm install --save-dev jest

-Otra vez modificamos el pack-json para hacer que npm run test corra los test de jest. "test": "echo "Error: no test specified" && exit 1" por "test": "jest".

OPCIONAL

Si quieres poder usar los test de integracion hay que instalar la API de telegram y concetarla a nuesto programa.

- npm i telegram -D

Crea una app desde aqui [https://my.telegram.org/auth](https://my.telegram.org/auth) rellena con la info que tienes estos campos en tu archivo .env

Tu eres en userone necesitas otra cuenta de telegram para poder hacer el test con dos usuarios hablando en el mismo chat.

BOT_TOKEN = ""
DATA_FILE_EXPENSES = "./data/ledger.json"
DATA_FILE_USERS = "./data/roster.json"
DATA_FILE_LOGGER = "./data/logger.json"

integration test env

API_ID_userone = ""
API_HASH_userone = ""
STRING_SESSION_userone = ""
API_ID_usertwo = ""
API_HASH_usertwo = ""
STRING_SESSION_usertwo = ""
NAME_OF_BOT_CHANNEL = ""

Crea un scritp si no esta ya creado     "integrationTest": "npx babel-node ./test/all_integration.test.js",

Descomenta la linea 32 y 33 para conseguir el STRING_SESSION_userone y vuelve lo a comentar si no quieres que te salga todo el rato.

Para correr los test de integraccion escribe en la terminal:  npm run integrationTest

-Scripts:

npm run start

npm run test

npm run integrationTest
