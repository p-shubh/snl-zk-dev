package gamecreatedeploy

import (
	"encoding/json"
	"fmt"
	"log"
	smartcontractdeploy "snl/sui_snl/smartContractDeploy"
)

// GameCreateDeploy deploys a smart contract and parses the JSON output.
func GameCreateDeploy() string {
	// Define the path to the directory containing the smart contract.
	path := "./gameCreateSmartContract/"

	// Execute the deployment command.
	output, err := smartcontractdeploy.DeployByDirectory(path)
	if err != nil {
		log.Fatalf("Failed to execute command: %v", err)
	}
	// fmt.Println("OUTPUT:", string(output))

	// Parse the JSON output into the Root struct.
	var root Root
	err = json.Unmarshal(output, &root)
	if err != nil {
		log.Fatalf("Failed to parse JSON: %v", err)
	}

	// Print successful deployment messages and the parsed root struct.
	fmt.Println("JSON data written to output.json")
	fmt.Println("Smart Contract Deployed Successfully")
	// fmt.Printf("%+v\n", root)
	// fmt.Println("root.ObjectChanges[2].PackageId : ", root.ObjectChanges[2].PackageId)
	for i, j := range root.ObjectChanges {
		fmt.Println("j.type : ", j.Type, "package id : ", j.PackageId, "index : ", i)
		if j.Type == "published" {
			return j.PackageId
		}
	}
	// return root.Transaction.p
	path = ""

	return ""
}
