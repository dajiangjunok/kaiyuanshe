package models

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Agenda struct {
	gorm.Model
	Topic       string     `json:"topic"` // 议程主题
	StartTime   *time.Time `json:"start_time"`
	EndTime     *time.Time `json:"end_time"`
	Description string     `json:"description"`
	SessionID   uint       `json:"session_id"` // 所属会话
	Session     *Session   `gorm:"foreignKey:SessionID" json:"session"`
	Speakers    []Speaker  `gorm:"foreignKey:AgendaID" json:"speakers"` // 包含多个嘉宾
}

// Agenda 的 CRUD 操作
func (a *Agenda) Create() error {
	return db.Create(a).Error
}

func (a *Agenda) GetByID(id uint) error {
	return db.First(a, id).Error
}

func (a *Agenda) GetByIDWithSpeakers(id uint) error {
	return db.Preload("Speakers").First(a, id).Error
}

func (a *Agenda) GetBySessionID(sessionID uint) ([]Agenda, error) {
	var agendas []Agenda
	err := db.Where("session_id = ?", sessionID).Order("start_time ASC").Find(&agendas).Error
	return agendas, err
}

func (a *Agenda) GetBySessionIDWithSpeakers(sessionID uint) ([]Agenda, error) {
	var agendas []Agenda
	err := db.Preload("Speakers").Where("session_id = ?", sessionID).Order("start_time ASC").Find(&agendas).Error
	return agendas, err
}

func (a *Agenda) Update() error {
	if a.ID == 0 {
		return errors.New("missing agenda ID")
	}
	return db.Save(a).Error
}

func (a *Agenda) Delete() error {
	if a.ID == 0 {
		return errors.New("missing agenda ID")
	}
	return db.Delete(a).Error
}

// 批量删除某个会话的所有议程
func DeleteAgendasBySessionID(sessionID uint) error {
	return db.Where("session_id = ?", sessionID).Delete(&Agenda{}).Error
}
