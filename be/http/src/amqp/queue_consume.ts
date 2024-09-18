import amqp from "amqplib"

const exchange = "test_1"
const args = process.argv.slice(2);
const routingKey = "ruslan"

const receiveLogsMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", {durable: true})

    const queue = await channel.assertQueue("test_1_queue")

    // eslint-disable-next-line no-console
    console.log("queue", JSON.stringify(queue));
    // eslint-disable-next-line no-console
    console.log(" [*] Waiting for messages in %s. To exit press CMD+C", queue.queue);

    await channel.bindQueue(queue.queue, exchange, routingKey);
    await channel.consume(queue.queue, (msgRes) => {
      // eslint-disable-next-line no-console
      console.log("msgRes", JSON.stringify(msgRes));
      if (msgRes !== null) {
        console.log(" [x] %s: '%s'", msgRes.fields.routingKey, msgRes.content.toString());
      } else {
        throw new Error("Consumer cancelled by server");
      }
    }, {
      noAck: false
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("error", e);
  }
}

receiveLogsMessage()
