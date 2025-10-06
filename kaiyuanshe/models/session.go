package models

import (
	"errors"

	"gorm.io/gorm"
)

type Session struct {
	gorm.Model
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Address     string   `json:"address"`
	Producer    string   `json:"producer"`  // 出品人
	Volunteer   string   `json:"volunteer"` // 志愿者
	EventID     uint     `json:"event_id"`  // 所属活动
	Event       *Event   `gorm:"foreignKey:EventID" json:"event"`
	Agendas     []Agenda `gorm:"foreignKey:SessionID" json:"agendas"` // 包含多个议程
}

// Session 的 CRUD 操作
func (s *Session) Create() error {
	return db.Create(s).Error
}

func (s *Session) GetByID(id uint) error {
	return db.First(s, id).Error
}

func (s *Session) GetByIDWithAgendas(id uint) error {
	return db.Preload("Agendas").First(s, id).Error
}

func (s *Session) GetByIDWithAgendasAndSpeakers(id uint) error {
	return db.Preload("Agendas.Speakers").First(s, id).Error
}

func (s *Session) GetByEventID(eventID uint) ([]Session, error) {
	var sessions []Session
	err := db.Where("event_id = ?", eventID).Find(&sessions).Error
	return sessions, err
}

func (s *Session) GetByEventIDWithAgendas(eventID uint) ([]Session, error) {
	var sessions []Session
	err := db.Preload("Agendas").Where("event_id = ?", eventID).Find(&sessions).Error
	return sessions, err
}

func (s *Session) GetByEventIDWithAgendasAndSpeakers(eventID uint) ([]Session, error) {
	var sessions []Session
	err := db.Preload("Agendas.Speakers").Where("event_id = ?", eventID).Find(&sessions).Error
	return sessions, err
}

func (s *Session) Update() error {
	if s.ID == 0 {
		return errors.New("missing session ID")
	}
	return db.Save(s).Error
}

func (s *Session) Delete() error {
	if s.ID == 0 {
		return errors.New("missing session ID")
	}
	return db.Delete(s).Error
}

// 批量删除某个事件的所有会话
func DeleteSessionsByEventID(eventID uint) error {
	return db.Where("event_id = ?", eventID).Delete(&Session{}).Error
}
