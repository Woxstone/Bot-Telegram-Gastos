
import { runIntegrationTest, showTestResults } from '../integrationTestRunner.js'
import { StringSession } from "telegram/sessions";

import { MyBot } from '../src/myBot.js';



const aBot = new MyBot();
aBot.start();



(async () => {
  let resultMessage = [];
  const fechaDeHoy = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(Date.now());

  resultMessage.push(await runIntegrationTest({
    stringSession: new StringSession(process.env.STRING_SESSION_userone),
    apiId : parseInt(process.env.API_ID_userone),
    apiHash: process.env.API_HASH_userone,
    testText: 'help test',
    intakeMessage : '/start',
    messageExpected:  `Soy un bot de gastos compartido`,
    especificDelay: 0
   }));

  
  resultMessage.push(await runIntegrationTest({
    stringSession: new StringSession(process.env.STRING_SESSION_userone),
    apiId : parseInt(process.env.API_ID_userone),
    apiHash: process.env.API_HASH_userone,
    testText: 'help test',
    intakeMessage : '/help',
    messageExpected:  `Hola, estos son los comandos que puedes utilizar:
/nuevo_usuario para crearte un usuario en este chat,
/addgasto "cantidad" "concepto" "DD/MM/YYYY" introducira un gasto en la bolsa del chat linkeado a ti,
/gastos te devolvere los gastos de este chat,
/cuenta usa este comando para dividir los gastos del chat con aquellos que hayan participado.
Si tienes algun problema /help para saber los formatos de nuevo`,
    especificDelay: 0
   }));



  showTestResults(resultMessage);
  process.exit(1);

})();