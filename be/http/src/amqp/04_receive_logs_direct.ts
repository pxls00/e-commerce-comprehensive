import amqp from "amqplib"

const exchange = "direct_logs"
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

const receiveLogsMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", {durable: false})

    const queue = await channel.assertQueue("")

    // eslint-disable-next-line no-console
    console.log("queue", JSON.stringify(queue));
    // eslint-disable-next-line no-console
    console.log(" [*] Waiting for messages in %s. To exit press CMD+C", queue.queue);

    args.forEach(async (severity) => {
      await channel.bindQueue(queue.queue, exchange, severity);

      await channel.consume(queue.queue, (msgRes) => {
        // eslint-disable-next-line no-console
        console.log("msgRes", JSON.stringify(msgRes));
        if (msgRes !== null) {
          console.log(" [x] %s: '%s'", msgRes.fields.routingKey, msgRes.content.toString());
        } else {
          throw new Error("Consumer cancelled by server");
        }
      }, {
        noAck: true
      })
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("error", e);
  }
}

receiveLogsMessage()
