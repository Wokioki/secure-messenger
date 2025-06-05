# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY . .

# Give execution rights to mvnw
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the jar file
CMD ["java", "-jar", "target/server-0.0.1-SNAPSHOT.jar"]