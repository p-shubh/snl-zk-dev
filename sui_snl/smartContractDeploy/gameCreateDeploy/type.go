package gamecreatedeploy

// Struct definitions to parse the JSON output.
/*type Data struct {
	MessageVersion string `json:"messageVersion"`
	Transaction    struct {
		Kind   string `json:"kind"`
		Inputs []struct {
			Type      string `json:"type"`
			ValueType string `json:"valueType"`
			Value     string `json:"value"`
		} `json:"inputs"`
		Transactions []map[string][]interface{} `json:"transactions"`
	} `json:"transaction"`
	Sender  string `json:"sender"`
	GasData struct {
		Payment []struct {
			ObjectID string `json:"objectId"`
			Version  int    `json:"version"`
			Digest   string `json:"digest"`
		} `json:"payment"`
		Owner  string `json:"owner"`
		Price  string `json:"price"`
		Budget string `json:"budget"`
	} `json:"gasData"`
}

type Transaction struct {
	Data         Data     `json:"data"`
	TxSignatures []string `json:"txSignatures"`
}

type Effects struct {
	MessageVersion string `json:"messageVersion"`
	Status         struct {
		Status string `json:"status"`
	} `json:"status"`
	ExecutedEpoch string `json:"executedEpoch"`
	GasUsed       struct {
		ComputationCost         string `json:"computationCost"`
		StorageCost             string `json:"storageCost"`
		StorageRebate           string `json:"storageRebate"`
		NonRefundableStorageFee string `json:"nonRefundableStorageFee"`
	} `json:"gasUsed"`
	ModifiedAtVersions []struct {
		ObjectID       string `json:"objectId"`
		SequenceNumber string `json:"sequenceNumber"`
	} `json:"modifiedAtVersions"`
	TransactionDigest string `json:"transactionDigest"`
	Created           []struct {
		Owner struct {
			AddressOwner string `json:"AddressOwner"`
		} `json:"owner"`
		Reference struct {
			ObjectID string `json:"objectId"`
			Version  int    `json:"version"`
			Digest   string `json:"digest"`
		} `json:"reference"`
	} `json:"created"`
	Mutated []struct {
		Owner struct {
			AddressOwner string `json:"AddressOwner"`
		} `json:"owner"`
		Reference struct {
			ObjectID string `json:"objectId"`
			Version  int    `json:"version"`
			Digest   string `json:"digest"`
		} `json:"reference"`
	} `json:"mutated"`
	GasObject struct {
		Owner struct {
			AddressOwner string `json:"AddressOwner"`
		} `json:"owner"`
		Reference struct {
			ObjectID string `json:"objectId"`
			Version  int    `json:"version"`
			Digest   string `json:"digest"`
		} `json:"reference"`
	} `json:"gasObject"`
	Dependencies []string `json:"dependencies"`
}

type ObjectChange struct {
	Type   string `json:"type"`
	Sender string `json:"sender"`
	Owner  struct {
		AddressOwner string `json:"AddressOwner"`
	} `json:"owner"`
	ObjectType      string   `json:"objectType"`
	ObjectID        string   `json:"objectId"`
	Version         string   `json:"version"`
	PreviousVersion string   `json:"previousVersion"`
	Digest          string   `json:"digest"`
	PackageID       string   `json:"packageId"`
	Modules         []string `json:"modules"`
}

type BalanceChange struct {
	Owner struct {
		AddressOwner string `json:"AddressOwner"`
	} `json:"owner"`
	CoinType string `json:"coinType"`
	Amount   string `json:"amount"`
}

type Root struct {
	Digest                  string          `json:"digest"`
	Transaction             Transaction     `json:"transaction"`
	Effects                 Effects         `json:"effects"`
	Events                  []interface{}   `json:"events"`
	ObjectChanges           []ObjectChange  `json:"objectChanges"`
	BalanceChanges          []BalanceChange `json:"balanceChanges"`
	ConfirmedLocalExecution bool            `json:"confirmedLocalExecution"`
}*/
// type Root struct {
// 	Digest      string `json:"digest"`
// 	Transaction struct {
// 		Data struct {
// 			MessageVersion string `json:"messageVersion"`
// 			Transaction    struct {
// 				Kind   string `json:"kind"`
// 				Inputs []struct {
// 					Type      string `json:"type"`
// 					ValueType string `json:"valueType"`
// 					Value     string `json:"value"`
// 				} `json:"inputs"`
// 				Transactions []struct {
// 					Publish         []string `json:"Publish,omitempty"`
// 					TransferObjects []any    `json:"TransferObjects,omitempty"`
// 				} `json:"transactions"`
// 			} `json:"transaction"`
// 			Sender  string `json:"sender"`
// 			GasData struct {
// 				Payment []struct {
// 					ObjectID string `json:"objectId"`
// 					Version  int    `json:"version"`
// 					Digest   string `json:"digest"`
// 				} `json:"payment"`
// 				Owner  string `json:"owner"`
// 				Price  string `json:"price"`
// 				Budget string `json:"budget"`
// 			} `json:"gasData"`
// 		} `json:"data"`
// 		TxSignatures []string `json:"txSignatures"`
// 	} `json:"transaction"`
// 	Effects struct {
// 		MessageVersion string `json:"messageVersion"`
// 		Status         struct {
// 			Status string `json:"status"`
// 		} `json:"status"`
// 		ExecutedEpoch string `json:"executedEpoch"`
// 		GasUsed       struct {
// 			ComputationCost         string `json:"computationCost"`
// 			StorageCost             string `json:"storageCost"`
// 			StorageRebate           string `json:"storageRebate"`
// 			NonRefundableStorageFee string `json:"nonRefundableStorageFee"`
// 		} `json:"gasUsed"`
// 		ModifiedAtVersions []struct {
// 			ObjectID       string `json:"objectId"`
// 			SequenceNumber string `json:"sequenceNumber"`
// 		} `json:"modifiedAtVersions"`
// 		TransactionDigest string `json:"transactionDigest"`
// 		Created           []struct {
// 			Owner     string `json:"owner"`
// 			Reference struct {
// 				ObjectID string `json:"objectId"`
// 				Version  int    `json:"version"`
// 				Digest   string `json:"digest"`
// 			} `json:"reference"`
// 		} `json:"created"`
// 		Mutated []struct {
// 			Owner struct {
// 				AddressOwner string `json:"AddressOwner"`
// 			} `json:"owner"`
// 			Reference struct {
// 				ObjectID string `json:"objectId"`
// 				Version  int    `json:"version"`
// 				Digest   string `json:"digest"`
// 			} `json:"reference"`
// 		} `json:"mutated"`
// 		GasObject struct {
// 			Owner struct {
// 				AddressOwner string `json:"AddressOwner"`
// 			} `json:"owner"`
// 			Reference struct {
// 				ObjectID string `json:"objectId"`
// 				Version  int    `json:"version"`
// 				Digest   string `json:"digest"`
// 			} `json:"reference"`
// 		} `json:"gasObject"`
// 		Dependencies []string `json:"dependencies"`
// 	} `json:"effects"`
// 	Events        []any `json:"events"`
// 	ObjectChanges []struct {
// 		Type   string `json:"type"`
// 		Sender string `json:"sender,omitempty"`
// 		Owner  struct {
// 			AddressOwner string `json:"AddressOwner"`
// 		} `json:"owner,omitempty"`
// 		ObjectType      string   `json:"objectType,omitempty"`
// 		ObjectID        string   `json:"objectId,omitempty"`
// 		Version         string   `json:"version"`
// 		PreviousVersion string   `json:"previousVersion,omitempty"`
// 		Digest          string   `json:"digest"`
// 		PackageID       string   `json:"packageId,omitempty"`
// 		Modules         []string `json:"modules,omitempty"`
// 	} `json:"objectChanges"`
// 	BalanceChanges []struct {
// 		Owner struct {
// 			AddressOwner string `json:"AddressOwner"`
// 		} `json:"owner"`
// 		CoinType string `json:"coinType"`
// 		Amount   string `json:"amount"`
// 	} `json:"balanceChanges"`
// 	ConfirmedLocalExecution bool `json:"confirmedLocalExecution"`
// }
// type Created struct {
// 	Owner     string `json:"owner"`
// 	Reference struct {
// 		ObjectID string `json:"objectId"`
// 		Version  int    `json:"version"`
// 		Digest   string `json:"digest"`
// 	} `json:"reference"`
// }
type Input struct {
	Type      string `json:"type"`
	ValueType string `json:"valueType"`
	Value     string `json:"value"`
}

type Transaction struct {
	Kind         string                   `json:"kind"`
	Inputs       []Input                  `json:"inputs"`
	Transactions []map[string]interface{} `json:"transactions"`
}

type GasPayment struct {
	ObjectId string `json:"objectId"`
	Version  int    `json:"version"`
	Digest   string `json:"digest"`
}

type GasData struct {
	Payment []GasPayment `json:"payment"`
	Owner   string       `json:"owner"`
	Price   string       `json:"price"`
	Budget  string       `json:"budget"`
}

type TransactionData struct {
	MessageVersion string      `json:"messageVersion"`
	Transaction    Transaction `json:"transaction"`
	Sender         string      `json:"sender"`
	GasData        GasData     `json:"gasData"`
}

type Effects struct {
	MessageVersion string `json:"messageVersion"`
	Status         struct {
		Status string `json:"status"`
	} `json:"status"`
	ExecutedEpoch string `json:"executedEpoch"`
	GasUsed       struct {
		ComputationCost         string `json:"computationCost"`
		StorageCost             string `json:"storageCost"`
		StorageRebate           string `json:"storageRebate"`
		NonRefundableStorageFee string `json:"nonRefundableStorageFee"`
	} `json:"gasUsed"`
	ModifiedAtVersions []struct {
		ObjectId       string `json:"objectId"`
		SequenceNumber string `json:"sequenceNumber"`
	} `json:"modifiedAtVersions"`
	TransactionDigest string `json:"transactionDigest"`
	Created           []struct {
		Owner     interface{} `json:"owner"`
		Reference struct {
			ObjectId string `json:"objectId"`
			Version  int    `json:"version"`
			Digest   string `json:"digest"`
		} `json:"reference"`
	} `json:"created"`
	Mutated []struct {
		Owner     interface{} `json:"owner"`
		Reference struct {
			ObjectId string `json:"objectId"`
			Version  int    `json:"version"`
			Digest   string `json:"digest"`
		} `json:"reference"`
	} `json:"mutated"`
	GasObject struct {
		Owner     interface{} `json:"owner"`
		Reference struct {
			ObjectId string `json:"objectId"`
			Version  int    `json:"version"`
			Digest   string `json:"digest"`
		} `json:"reference"`
	} `json:"gasObject"`
	Dependencies []string `json:"dependencies"`
}

type ObjectChange struct {
	Type            string      `json:"type"`
	Sender          string      `json:"sender"`
	Owner           interface{} `json:"owner,omitempty"`
	ObjectType      string      `json:"objectType,omitempty"`
	ObjectId        string      `json:"objectId,omitempty"`
	Version         string      `json:"version,omitempty"`
	PreviousVersion string      `json:"previousVersion,omitempty"`
	Digest          string      `json:"digest,omitempty"`
	PackageId       string      `json:"PackageId,omitempty"`
	Modules         []string    `json:"modules,omitempty"`
}

type BalanceChange struct {
	Owner    interface{} `json:"owner"`
	CoinType string      `json:"coinType"`
	Amount   string      `json:"amount"`
}

type Root struct {
	Digest                  string          `json:"digest"`
	Transaction             TransactionData `json:"transaction"`
	Effects                 Effects         `json:"effects"`
	Events                  []interface{}   `json:"events"`
	ObjectChanges           []ObjectChange  `json:"objectChanges"`
	BalanceChanges          []BalanceChange `json:"balanceChanges"`
	ConfirmedLocalExecution bool            `json:"confirmedLocalExecution"`
}
