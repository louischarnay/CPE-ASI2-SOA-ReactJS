FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

COPY ./pom.xml .

COPY ./src ./src

RUN mvn clean install

FROM openjdk:17

WORKDIR /app

COPY --from=build /app/target/backendmonolithic-0.0.1-SNAPSHOT.jar backendmonolithic-0.0.1-SNAPSHOT.jar

CMD ["java", "-jar", "backendmonolithic-0.0.1-SNAPSHOT.jar"]
