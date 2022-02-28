



(async () => {
  let resultMessage = [];
 
  // testing actions

  resultMessage.push(await runIntegrationTest('gastos command test', '/gastos',`El ${fechaDeHoy}, cantidad: 35 "copas`, 0));


  showTestResults(resultMessage);
  process.exit(1);

})(); 

