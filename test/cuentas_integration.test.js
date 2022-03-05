import { runIntegrationTest, showTestResults } from '../integrationTestRunner.js'
import { StringSession } from "telegram/sessions";



(async () => {
  let resultMessage = [];
  const fechaDeHoy = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(Date.now());
  // testing actions

  resultMessage.push(await runIntegrationTest({
    stringSession: new StringSession(process.env.STRING_SESSION_userone),
    apiId : parseInt(process.env.API_ID_userone),
    apiHash: process.env.API_HASH_userone,
    testText: 'new user test',
    intakeMessage : '/nuevo_usuario',
    messageExpected: `Usuario registrado: Hola Nacho tu usuario ha sido creado.`,
    especificDelay: 0
   }));

   resultMessage.push(await runIntegrationTest({
    stringSession: new StringSession(process.env.STRING_SESSION_usertwo),
    apiId : parseInt(process.env.API_ID_usertwo),
    apiHash: process.env.API_HASH_usertwo,
    testText : 'a second new user test',
    intakeMessage : '/nuevo_usuario',
    messageExpected: `Usuario registrado: Hola Motercode tu usuario ha sido creado.`,
    especificDelay: 0
   }));

   resultMessage.push(await runIntegrationTest({
    stringSession: new StringSession(process.env.STRING_SESSION_usertwo),
    apiId : parseInt(process.env.API_ID_usertwo),
    apiHash: process.env.API_HASH_usertwo,
    testText : 'user allready exist test',
    intakeMessage : '/nuevo_usuario',
    messageExpected: `Usuario ya registrado: Hola Motercode tu usuario ya estaba creado en este chat.`,
    especificDelay: 7
   }));

  resultMessage.push(await runIntegrationTest({
     stringSession: new StringSession(process.env.STRING_SESSION_usertwo),
     apiId : parseInt(process.env.API_ID_usertwo),
     apiHash: process.env.API_HASH_usertwo,
     testText : 'addgasto command test user 2',
     intakeMessage : '/addgasto 35 manzanas',
     messageExpected: `gasto registrado: El ${fechaDeHoy}, Motercode metio un gasto de cantidad: 35, "manzanas"`,
     especificDelay: 6
    }));

    resultMessage.push(await runIntegrationTest({
      stringSession: new StringSession(process.env.STRING_SESSION_userone),
      apiId : parseInt(process.env.API_ID_userone),
      apiHash: process.env.API_HASH_userone,
      testText : 'addgasto command test user one',
      intakeMessage : '/addgasto 76 peras',
      messageExpected: `Gasto registrado: El ${fechaDeHoy}, Nacho metio un gasto de cantidad: 76, "peras"`,
      especificDelay: 7
     }));

     resultMessage.push(await runIntegrationTest({
      stringSession: new StringSession(process.env.STRING_SESSION_userone),
      apiId : parseInt(process.env.API_ID_userone),
      apiHash: process.env.API_HASH_userone,
      testText : 'addgasto command test user one concept user 2',
      intakeMessage : '/addgasto 8 manzanas',
      messageExpected: `Gasto registrado: El ${fechaDeHoy}, Nacho metio un gasto de cantidad: 8, "manzanas"`,
      especificDelay: 0
     }));

     resultMessage.push(await runIntegrationTest({
      stringSession: new StringSession(process.env.STRING_SESSION_userone),
      apiId : parseInt(process.env.API_ID_userone),
      apiHash: process.env.API_HASH_userone,
      testText : 'gastos command test ',
      intakeMessage : '/gastos',
      messageExpected: `El ${fechaDeHoy}, Nacho metio un gasto de cantidad: 76, "peras"
El ${fechaDeHoy}, Nacho metio un gasto de cantidad: 8, "manzanas"`,
      especificDelay: 0
     }));

     resultMessage.push(await runIntegrationTest({
      stringSession: new StringSession(process.env.STRING_SESSION_userone),
      apiId : parseInt(process.env.API_ID_userone),
      apiHash: process.env.API_HASH_userone,
      testText : 'cuenta command test ',
      intakeMessage : '/cuenta',
      messageExpected: `La cuenta: Motercode le debe a Nacho 42E.`,
      especificDelay: 0
     }));


  showTestResults(resultMessage);
  process.exit(1);

})(); 