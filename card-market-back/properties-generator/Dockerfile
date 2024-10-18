FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

COPY ./pom.xml .

COPY ./src/main/resources/colorToproperties-1.1.2.jar /lib/colorToProperties-1.1.2.jar
COPY ./src ./src

RUN mvn install:install-file -Dfile="/lib/colorToProperties-1.1.2.jar" -DgroupId="tp.cpe" -DartifactId=colorToProperties -Dversion="1.1.2" -Dpackaging=jar

RUN mvn clean install

FROM openjdk:17

WORKDIR /app

COPY --from=build /app/target/propertiesgenerator-0.0.1-SNAPSHOT.jar propertiesgenerator-0.0.1-SNAPSHOT.jar

CMD ["java", "-jar", "propertiesgenerator-0.0.1-SNAPSHOT.jar"]
