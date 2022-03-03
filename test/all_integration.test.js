
// clase a testear
import { MyBot } from '../src/myBot.js';

// describe: creacion de usuario, meter gastos y pedir gastos.

const aBot = new MyBot();
aBot.start();





// require('./cuentas_integration.test');
// require('./client_integration.test');
require('./basic_actions_integration.test');
