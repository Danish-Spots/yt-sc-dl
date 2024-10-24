FROM openapitools/openapi-generator-cli as build
COPY  ./api-spec.yaml app/
run ls
