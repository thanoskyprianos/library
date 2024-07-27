Start-Process .\back-end\mvnw -ArgumentList "-f",  ".\back-end",  "clean", "package" -NoNewWindow -Wait
Start-Process -FilePath "java" -ArgumentList "-jar", "./back-end/target/books-db-0.0.1-SNAPSHOT.jar" -NoNewWindow
Invoke-Item "./front-end/index.html"