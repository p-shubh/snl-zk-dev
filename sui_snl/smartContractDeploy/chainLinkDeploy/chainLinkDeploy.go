package chainlinkdeploy

import (
	"encoding/json"
	"fmt"
	"log"
	"regexp"
	smartcontractdeploy "snl/sui_snl/smartContractDeploy"
)

func ChainLinkCreateDeploy() string {
	// Define the path to the directory containing the smart contract.
	path := "./smartContracts/snl_chainlink"

	// Execute the deployment command.
	output, err := smartcontractdeploy.DeployByDirectorysnlChainLink(path)
	if err != nil {
		log.Fatalf("Failed to execute command: %v", err)
	}
	fmt.Println("OUTPUT:", string(output))

	// Use a regular expression to extract the JSON part from the output.
	re := regexp.MustCompile(`\{.*\}`)
	jsonStr := re.FindString(string(output))
	if jsonStr == "" {
		log.Fatalf("Failed to extract JSON from output")
	}

	// Parse the JSON output into the DeploymentOutput struct.
	var deploymentOutput DeploymentOutput
	err = json.Unmarshal([]byte(jsonStr), &deploymentOutput)
	if err != nil {
		log.Fatalf("Failed to parse JSON: %v", err)
	}

	// Print successful deployment messages and the parsed struct.
	fmt.Println("Printing the struct:", deploymentOutput)
	path = ""

	return deploymentOutput.ContractAddress
}
