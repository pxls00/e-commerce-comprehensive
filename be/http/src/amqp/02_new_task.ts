import amqp from "amqplib"
// const amqp = require("amqplib");

const queueName = "task_queue";
const msg = process.argv.slice(2).join(' ') || "Hello world";

const sendMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: true})
    channel.sendToQueue(queueName, Buffer.from(msg), {
      persistent: true
    });

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
