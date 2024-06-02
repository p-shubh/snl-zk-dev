package chainlinkdeploy

type DeploymentOutput struct {
	ChainId        int    `json:"chainId"`
	ContractAddress string `json:"contractAddress"`
	Verified       bool   `json:"Verified"`
	BlockNumber    int    `json:"blockNumber"`
}