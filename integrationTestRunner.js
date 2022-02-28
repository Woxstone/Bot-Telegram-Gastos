import { TelegramClient } from "telegram";
// import { StringSession } from "telegram/sessions";
import input from "input";
import 'dotenv/config'







const timeoutsecs = 3;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms!=0?ms*1000:timeoutsecs*1000));


async function runIntegrationTest(params){
    let resultMessage=[];
    let answerMessages = [];
    let newMessages = false;
    let initialMessagesLength=0;
    console.log("Loading integration test...");
    const client = new TelegramClient(params.stringSession, params.apiId, params.apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      phoneNumber: async () => await input.text("Please enter your number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    
  
  
  
    
    await client.sendMessage(process.env.NAME_OF_BOT_CHANNEL, { message: params.intakeMessage });
    initialMessagesLength = (await client.getMessages(process.env.NAME_OF_BOT_CHANNEL,{})).length;  
    await delay(params.especificDelay);
    answerMessages = await client.getMessages(process.env.NAME_OF_BOT_CHANNEL,{});  
    newMessages = (initialMessagesLength != answerMessages.length);
  
    if(!newMessages)
    {
      resultMessage.push(`\x1b[33mel bot no ha respondido en el tiempo especificado ${params.especificDelay?params.especificDelay:timeoutsecs} segundos\x1b[37m`);
    }else if( answerMessages[0].message==params.messageExpected)
    {
       resultMessage.push(`\x1b[32m${params.testText} : el test ha sido correcto\x1b[37m`);
    }
    else{
      resultMessage.push(`el bot ha respondido <\x1b[31m${answerMessages[0].message}\x1b[37m> y se esperaba <\x1b[32m${params.messageExpected}\x1b[37m> `);
    }
  
  
    return resultMessage;
  }
  
  function showTestResults(testResultsArray){
    let i=0;
    console.log (`
    
            TEST RESULTS 
    `)
    testResultsArray.forEach(message => {
      i++;
      console.log(`${i} ---> ${message[0]}`);
    })
    console.log (`
`)
  }

  export {runIntegrationTest , 
          showTestResults };