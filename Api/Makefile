compile:
	dotnet publish -c Release -r linux-arm --self-contained -p:PublishSingleFile=true -p:PublishTrimmed=true
	docker compose up --build
