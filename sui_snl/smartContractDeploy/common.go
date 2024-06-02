package smartcontractdeploy

import (
	"fmt"
	"log"
	"os"
	"os/exec"
)

func ExecuteCommand(command string, moveFilePath string) (string, error) {
	cmd := exec.Command(command, moveFilePath)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}
	return string(output), nil
}

// DeployByDirectory deploys the smart contract by running a command in the target directory.
func DeployByDirectory(targetDir string) ([]byte, error) {
	currentDir, err := os.Getwd()
	fmt.Println("currentDir : ", currentDir)
	if err != nil {
		return nil, fmt.Errorf("failed to get current working directory: %w", err)
	}

	// Change the current working directory to the target directory.
	err = os.Chdir(targetDir)
	if err != nil {
		return nil, fmt.Errorf("failed to change directory: %w", err)
	}

	defer func() {
		// Return to the original directory
		if err := os.Chdir(currentDir); err != nil {
			log.Fatalf("Failed to change back to original directory: %v", err)
		}
	}()
	// Construct the command to publish the files using sui client.
	cmd := exec.Command("sui", "client", "publish", "--json")

	// Run the command and capture the output.
	output, err := cmd.Output()
	if err != nil {
		return nil, fmt.Errorf("failed to execute command: %w", err)
	}

	return output, nil
}
func DeployByDirectorysnlChainLink(targetDir string) ([]byte, error) {
	currentDir, err := os.Getwd()
	fmt.Println("currentDir : ", currentDir)
	if err != nil {
		return nil, fmt.Errorf("failed to get current working directory: %w", err)
	}

	// Change the current working directory to the target directory.
	err = os.Chdir(targetDir)
	if err != nil {
		return nil, fmt.Errorf("failed to change directory: %w", err)
	}

	defer func() {
		// Return to the original directory
		if err := os.Chdir(currentDir); err != nil {
			log.Fatalf("Failed to change back to original directory: %v", err)
		}
	}()
	// Construct the command to publish the files using sui client.
	cmd := exec.Command("yarn", "launch")

	// Run the command and capture the output.
	output, err := cmd.Output()
	if err != nil {
		return nil, fmt.Errorf("failed to execute command: %w", err)
	}

	return output, nil
}
