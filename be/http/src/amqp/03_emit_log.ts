import amqp from "amqplib"
// const amqp = require("amqplib");

const exchange = "logs"
const msg = process.argv.slice(2).join(' ') || "Hello world";

const sendMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "fanout", {durable: false})
    channel.publish(exchange, "", Buffer.from(msg))

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
