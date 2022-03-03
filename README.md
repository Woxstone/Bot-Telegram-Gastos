# **BOT-TELEGRAM-GASTOS**
Es un bot que se encarga de repartir gastos entre personas utilizando la aplicacion de telegram.
## **INSTALACION**
Este bot de telegram programado con Js (Es6) usadistintas librerias para instalarlas correctamente sigue los siguientes pasos:

    Clonar del repositorio usando el HTTPS: https://github.com/Woxstone/Bot-Telegram-Gastos.git
    En terminal : 
        npm install 
## **CONFIGURACION**
### Crear archivo .env en la carpeta raiz. El archivo debe contener esta informacion.
    BOT_TOKEN = ""
    DATA_FILE_EXPENSES = "./data/ledger.json"
    DATA_FILE_USERS = "./data/roster.json"
    DATA_FILE_LOGGER = "./data/logger.json"
En bot token puedes añadir el token de un bot que ya tengas, o crear uno en telegram en el chat de TheBotFather
>Explicar como crear un bot

#### OPCIONAL
Para poder poder hacer test con dos usuarios hablando en el mismo chat necesitaras agregar esta informacion en el archivo .env 
```
API_ID_userone = ""
API_HASH_userone = ""
STRING_SESSION_userone = ""
API_ID_usertwo = ""
API_HASH_usertwo = ""
STRING_SESSION_usertwo = ""
NAME_OF_BOT_CHANNEL = ""
```

- Crea una app desde aqui [https://my.telegram.org/auth](https://my.telegram.org/auth), acontinuacion accede a *API development tools* y rellena con la info que tienes estos campos  en tu archivo .env 
- Estos seran del userone
  - API_ID_userone
  - API_HASH_userone


- Para obtener
**STRING_SESSION_userone** 
    - Abrir archivo integrationTestRunner.js
    - Descomenta la linea 32 y 33
    - Entra en la terminal y escribe
      - npm run integrationTest
    - Tienes que copiar el parrafo debajo de You should now be connected.
    - Y ese es tu STRING_SESSION_userone
    - **Acuerdate de volver a comentar estas lineas**

>esta parte se tiene que comprobar si esta bien explicado
---
- Ahora necesitaras otra cuenta de telegram
  - Y repetir el proceso con la otra cuenta de telegram pero añadiendo estos datos al usertwo
  - Completar 
    - API_ID_usertwo
    - API_HASH_usertwo
    - STRING_SESSION_usertwo
---
- El nombre del bot NAME_OF_BOT_CHANNEL
  - Es el nombre del chat donde quieres que se manden los mensajes, si esto no funciona puedes poner el id del chat que lo pudes sacar de dos formas o por la URL (https://community.jamaicans.dev/t/get-the-telegram-channel-id/427) o en el ctx.


## **COMMANDOS TERMINAL**
Activar bot
```
npm run start
```
Para poder utilizar jest y correr los test
```
npm run test
```
Test de integracion
```
npm run integrationTest
```
## **COMMNADOS TELEGRAM** ##

## **DOCUMENTACION**
- jest 
  - Nos permite realizar tests
- babel
  - Para poder utilizar import export 
- mocks
  - permite aislar test
- telegraf
  - libreria para poder utilizar telegram

