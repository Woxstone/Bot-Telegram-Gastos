import 'dotenv/config';
console.log(process.env.configurationTest);

(async () => {
  let resultMessage = [];


  resultMessage.push(await runIntegrationTest('nuevo usuario command test', "/nuevo_usuario", `usuario registrado: Hola ${configurationTest.client_user.first_name} tu usuario ha sido creado.`, 0));
  resultMessage.push(await runIntegrationTest('añadir primer gasto command test', '/nuevo_usuario', `usuario ya registrado: Hola ${configurationTest.client_user.first_name} tu usuario ya estaba creado en este chat.`, 0));


  showTestResults(resultMessage);
  process.exit(1);

})();

