package models

import (
	"errors"

	"gorm.io/gorm"
)

type Testnet struct {
	gorm.Model
	BlockNum     uint64 `json:"block_num"`
	AvgBlockTime string `json:"avg_block_time"`
	Contracts    uint   `json:"contracts"`
}

func (t *Testnet) Create() error {
	return db.Create(t).Error
}

func (t *Testnet) Update() error {
	if t.ID == 0 {
		return errors.New("missing Testnet ID")
	}
	return db.Save(t).Error
}

func (t *Testnet) GetLatest() error {
	return db.Order("block_num desc").Find(t).Error
}
