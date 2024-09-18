import amqp from "amqplib"
// const amqp = require("amqplib");

const exchange = "direct_logs"
const args = process.argv.slice(2);
const msg = args.slice(1).join(' ') || "Hello world";
const severity = (args.length > 0) ? args[0] : 'info';

const sendMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", {durable: false})
    channel.publish(exchange, severity, Buffer.from(msg))

    // eslint-disable-next-line no-console
    console.log(" [x] Sent %s: '%s'", severity, msg);

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
