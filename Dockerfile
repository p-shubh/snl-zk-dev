FROM golang:alpine as builder
WORKDIR /app/snl
COPY go.mod .
COPY go.sum .
RUN apk add --no-cache build-base openssl
RUN go mod download
COPY . .
RUN apk add --no-cache git && go build -o snl . && apk del git && install wget
RUN wget https://github.com/MystenLabs/sui/releases/download/testnet-v1.25.1/sui-testnet-v1.25.1-ubuntu-x86_64.tgz
# RUN apt-get install sui
FROM alpine
WORKDIR /app/snl
RUN apk add --no-cache openssl
COPY --from=builder /app/snl .
CMD [ "./snl" ]