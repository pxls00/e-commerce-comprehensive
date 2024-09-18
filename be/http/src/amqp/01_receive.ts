import amqp from "amqplib"

const queueName = "hello";

const receiveMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: false})

    await channel.consume(queueName, (msgRes) => {
      if (msgRes !== null) {
        console.log(" [x] Received %s", msgRes.content.toString());
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

receiveMessage()
