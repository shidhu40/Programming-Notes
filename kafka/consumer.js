const kafka = require('./kafka-config.js');
const errorType = ['unhandleRejection', 'uncaughtException'];

const kafkaConsumer = kafka.consumer({groupId: 'kafkaConsumerGroup', fromBeginning: true});

const kafkaFunConsumer = async (kafkaConsumer) => {
	await kafkaConsumer.subscribe({ topics: 'imageDeleteSync' });
	await kafkaConsumer.run({
		autoCommit: false,
		eachMessage: async (task) => {
			console.log(task.topic, task.message);
			kafkaConsumer.commitOffsets([{ topic: task.topic, partition: task.partition, offset: (Number(task.message.offset) +1).toString() }]);
			kafka.logger().info(`topic: ${task.topic} partition: ${task.partition} offset: ${task.message.offset} consumed successfully`);
		}
	});
}

const kafkaConnect = () => {
	kafka.ping({}, { requestTimeout: 2000 }, async(err, response) => {
		kafkaConsumer.connect();
		if (response.statusCode == 200) {
			kafkaFunConsumer(kafkaConsumer).catch(console.error);
		} else {
			kafkaConsumer.disconnect();
			setTimeout(() => { kafkaConnect() }, 30000);
		}
	});
}

kafkaConnect();
kafkaConsumer.on('consumer.crash', async (paylaod) => {
	console.log(payload);
	try{
		await kafkaConsumer.connect();
	} catch (error) {
		console.log("error tackle in consumer", error);
	} finally {
		setTimeout( async () => {
			await kafkaConsumer.connect();
			kafkaFunConsumer(kafkaConsumer).catch(console.error);
		}, 5000);
	}
});

process.on('SIGINT', function () {
	kafkaConsumer.disconnect();
	process.exit();
});

errorTypes.forEach(type => {
	process.on(type, async (e) => {
		try {
			console.log(`process.on ${type}`);
			console.error(e);
			kafkaConsumer.disconnect();
			process.exit(0);
		} catch() {
			process.exit(1);
		}
	});
});
	