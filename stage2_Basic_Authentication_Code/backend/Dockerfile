FROM eclipse-temurin:21-jdk

RUN useradd -m springuser

WORKDIR /app

COPY target/*.jar app.jar

RUN chown -R springuser:springuser /app

USER springuser

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]