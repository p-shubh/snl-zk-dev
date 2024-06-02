package model

import "time"

// Define a struct to represent your table
type SlnSui struct {
	GameID          int       `gorm:"primaryKey;serial"`
	CreatedAt       time.Time `gorm:"column:created_at;default:now()"`
	ContractAddress string    `gorm:"column:contract_address"`
	Name            string    `gorm:"column:name" json:"name"`
	Url             string    `gorm:"column:url" json:"url"`
}
type ChainLink struct {
	ID              int       `gorm:"primaryKey;serial"`
	WalletAddress   string    `gorm:"column:walletaddress" json:"walletAddress"`
	ContractAddress string    `gorm:"column:contract_address"`
	CreatedAt       time.Time `gorm:"column:created_at;default:now()"`
}