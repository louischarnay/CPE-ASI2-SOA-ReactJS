FROM openjdk:17
RUN mkdir -p /app/SP
WORKDIR /app/SP
COPY ./target/cardgenerator-0.0.1-SNAPSHOT.jar cardgenerator-0.0.1-SNAPSHOT.jar
CMD ["java","-jar","cardgenerator-0.0.1-SNAPSHOT.jar"]
