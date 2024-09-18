import amqp from "amqplib"

const exchange = "logs"

const receiveLogsMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "fanout", {durable: false})

    const queue = await channel.assertQueue("")

    // eslint-disable-next-line no-console
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue.queue);

    await channel.bindQueue(queue.queue, exchange, "");

    await channel.consume(queue.queue, (msgRes) => {
      if (msgRes !== null) {
        console.log(" [x] Received %s", msgRes?.content.toString());
      } else {
        throw new Error("Consumer cancelled by server");
      }
    }, {
      noAck: true
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("error", e);
  }
}

receiveLogsMessage()
