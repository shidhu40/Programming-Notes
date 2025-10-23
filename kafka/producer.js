const kafka = require('./kafka-config.js');
const producer = kafka.producer({
	allowAutoTopicCreation: false,
	maxInFlightRequests: 1
});

const produce = async (kafkaTopics, message, partition) => {
	try{
		await producer.connect();
		const response = await producer.send({
			topic : kafkaTopics,
			message: [{
				key : '',
				value: JSON.stringify(JSON.parse(message)),
				partition: partition
			}]
		});
		console.log(response);
		kafka.logger().info(`Message sent #`, {response});
	} catch (err) {
		console.error("Count not produce message", err);
		kafka.logger().error(`Error in message producer ${err.message}`);
	}
}

module.exports = produce;