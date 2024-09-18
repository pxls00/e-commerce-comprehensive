#### запустить rabbit
```shell
docker run -it -d --rm --name rabbitmq --hostname amqp -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

#### Запустить слушатель
```shell
npx ts-node ./src/amqp/04_receive_logs_direct.ts warning error to_1c >> ./src/amqp/logs_from_rabbit.log
```

#### отправить сообщение
```shell
npx ts-node ./src/amqp/04_emit_logs_direct.ts to_1c "msg to_1c."
```

ТУДУ:
- Посмотреть как отправлять сообщения в именованную очередь через именованный exchange
