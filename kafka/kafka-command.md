## locate to kafka directory
cd usr/local/kafka

## To create topic 
./bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --topic="imageDeleteSync" partition=1 -replication-factor=1

## To list all topics
bin/kafka-topics.sh --list --bootstrap-server 10.75.112.96:9092

## To get information about kafka topics
bin/kafka-topics.sh --describe --topic imageDeleteSync --bootstrap-server localhost:9092

## To consume message from topics
bin/kafka-console-consumer.sh --topic imageDeleteSync --from-beginning --bootstrap-server 10.75.80.99:9092

## To delete the topic
./bin/kafka-topics.sh --delete --topic imageDeleteSync --bootstarp-server 10.75.112.92:9092

## To update the partitions
./bin/kafka-topics.sh --alter --zookeeper 10.75.112.92:9092 --topic imageDeleteSync --partitions 2

## Produce message using kafka
./bin/kafka-console-producer.sh --topic imageDeleteSync --bootstrap-server 10.75.112.92:9092

## Check the status of kafka
sudo systemctl status zookeeper

sudo systemctl status kafka

