FROM openjdk:17

RUN mkdir -p /app/SP

WORKDIR /app/SP

RUN mvn clean install

COPY ./target/imagegenerator-0.0.1-SNAPSHOT.jar imagegenerator-0.0.1-SNAPSHOT.jar

CMD ["java","-jar","imagegenerator-0.0.1-SNAPSHOT.jar"]
