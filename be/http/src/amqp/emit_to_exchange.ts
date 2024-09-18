import amqp from "amqplib"

const exchange = "test_1"
const args = process.argv.slice(2);
const msg = args.slice(1).join(' ') || "Hello world";
const routingKey = "ruslan"

const sendMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", {durable: true})
    channel.publish(exchange, routingKey, Buffer.from(msg))

    // eslint-disable-next-line no-console
    console.log(" [x] Sent %s: '%s'", routingKey, msg);

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
