import amqp from "amqplib"

const queueName = "task_queue";

const receiveMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: true})
    await channel.prefetch(1);
    await channel.consume(queueName, (msgRes) => {
      if (msgRes !== null) {
        const secs = (msgRes?.content || Buffer.from("")).toString().split('.').length - 1;

        console.log(" [x] Received %s", msgRes?.content.toString());

        setTimeout(() => {
          console.log(" [x] Done");
          channel.ack(msgRes)
        }, secs * 1000);
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

receiveMessage()
