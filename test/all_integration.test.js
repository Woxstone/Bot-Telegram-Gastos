import { runIntegrationTest, showTestResults } from '../integrationTestRunner.js'
// clase a testear
import { MyBot } from '../src/myBot.js';

// describe: creacion de usuario, meter gastos y pedir gastos.

const aBot = new MyBot();
aBot.start();

const fechaDeHoy = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}).format(Date.now());



require('./pruebas_integration.test');
//  require('./client_integration.test');
