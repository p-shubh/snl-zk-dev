package main

import (
	"log"
	"os"
	router "snl/Router"
	dbflow "snl/dbFlow"

	"github.com/joho/godotenv"
)

func main() {
	if os.Getenv("LOAD_CONFIG_FILE") == "" {
		// Load environment variables from .env file
		err := godotenv.Load()
		if err != nil {
			log.Printf("Error in reading the config file : %v\n", err)
		}
	}
	dbflow.DbTest()
	router.HandleRequest()
}
