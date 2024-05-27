FROM golang:alpine as builder
WORKDIR /app/snl
COPY go.mod .
COPY go.sum .
RUN apk add --no-cache build-base openssl
RUN go mod download
COPY . .
RUN apk add --no-cache git && go build -o snl . && apk del git 
FROM alpine
WORKDIR /app/snl
RUN apk add --no-cache openssl
COPY --from=builder /app/snl .
CMD [ "./snl" ]