const { Kafka, Partitioners, logLevel } = require('kafkajs');
const kafka = new Kafka({
	clientId: 'kafkaCleintApp',
	logLevel: logLevel.ERROR,
	brokers: ['pck-7prvp.centralindia.azure.confluent.cloud:9092'],
	ssl: true,
	sasl: {
		mechanism: 'plain',
		username: '03LQTBBZPWB3JQVA',
		password: 'xV+v45njh545m5453'
	},
	connectionTimeout: 3000
});

kafka.logger().setLogLevel(logLevel.WARN);

module.exports = kafka;