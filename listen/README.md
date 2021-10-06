<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest Logo" /></a>
</p>

## Install Kafka locally with Bitnami Helm

~~~bash
helm repo add bitnami https://charts.bitnami.com/bitnami
~~~

## Define the internal Kubernetes DNS

~~~bash
27.0.0.1 kafka-0.kafka-headless.default.svc.cluster.local
~~~

## After installation setup the internal domain

~~~bash
kubectl port-forward service/kafka 9092:9092
~~~

## CLI Based Producer

~~~bash
./kafka-console-producer.sh --topic products-topic --bootstrap-server  kafka-0.kafka-headless.default.svc.cluster.local:9092
~~~

## CLI Based Consumer

~~~bash
./kafka-console-consumer.sh --topic products-topic --from-beginning --bootstrap-server kafka-0.kafka-headless.default.svc.cluster.local:9092
~~~

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

~~~bash
$ npm install
~~~

## Running the app

~~~bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
~~~

## Test

~~~bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
~~~
