import amqp from "amqplib"
// const amqp = require("amqplib");

const queueName = "hello";
const msg = "Hello world123";

const sendMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: false})
    channel.sendToQueue(queueName, Buffer.from(msg));
    // eslint-disable-next-line no-console
    console.log("Message", msg);
    setTimeout(() => {
      connection.close();
      process.exit(0)
    }, 500)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("error", e);
  }
}

sendMessage();
