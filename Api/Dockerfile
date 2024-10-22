# Use the official .NET SDK (build environment) as a base for building the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the .csproj file and restore dependencies
COPY ["Api.csproj", "./"]
RUN dotnet restore

# Copy the rest of the application code
COPY . .

# Build the application
RUN dotnet build -c Release -o /app/build

# Publish the app (ready for production)
RUN dotnet publish -c Release -o /app/publish

# Now use the official ASP.NET runtime (base image) for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Step 1: Install dependencies including OpenSSL
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-venv \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Step 2: Create a virtual environment and install yt-dlp
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install yt-dlp
# Step 4: Copy the published app from the build stage
COPY --from=build /app/publish .

# Step 5: Configure ASP.NET Core to use the generated certificate
# ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https-certs/https.crt
# ENV ASPNETCORE_Kestrel__Certificates__Default__KeyPath=/https-certs/https.key

# Expose ports if needed (80 for HTTP, 443 for HTTPS)
EXPOSE 80
EXPOSE 443

# Run the application
ENTRYPOINT ["dotnet", "Api.dll"]
