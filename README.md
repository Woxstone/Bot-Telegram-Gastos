clone
npm install
npm run test 
npm run start

recuerda necesitas un archivo .env con  los siguientes datos

API_ID = ""
API_HASH = ""
STRING_SESSION = ""
BOT_TOKEN = ""
NAME_OF_BOT_CHANNEL = ""
DATA_FILE_EXPENSES = "./data/ledger.json"
DATA_FILE_USERS = "./data/roster.json"
DATA_FILE_LOGGER = "./data/logger.json"
ENVIRONTMENT = "development"


para saber como conseguirlos https://github.com/motercode/boiler_Jest_Babel_Telegraf
acuerdate de descomentar los consoles para obtener el string_session !!!!


\n
Sugerencia creo que en ledger user_id y expense_id no corresponde a lo que estas metiendo ya que en realiadad cuando es llamada expense_id le metemos un objeto
