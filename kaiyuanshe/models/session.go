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

// 创建会话及其关联的议程和嘉宾
func (s *Session) CreateWithAgendasAndSpeakers() error {
	tx := db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// 首先创建会话
	if err := tx.Create(s).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 创建关联的议程
	for i := range s.Agendas {
		// 确保 Agenda 的 ID 为 0，让数据库自动生成
		s.Agendas[i].ID = 0
		s.Agendas[i].SessionID = s.ID

		// 创建 Agenda
		if err := tx.Create(&s.Agendas[i]).Error; err != nil {
			tx.Rollback()
			return err
		}

		// 创建关联的嘉宾
		for j := range s.Agendas[i].Speakers {
			// 确保 Speaker 的 ID 为 0，让数据库自动生成
			s.Agendas[i].Speakers[j].ID = 0
			s.Agendas[i].Speakers[j].AgendaID = s.Agendas[i].ID

			if err := tx.Create(&s.Agendas[i].Speakers[j]).Error; err != nil {
				tx.Rollback()
				return err
			}
		}
	}

	return tx.Commit().Error
}

// 批量删除某个事件的所有会话
func DeleteSessionsByEventID(eventID uint) error {
	return db.Where("event_id = ?", eventID).Delete(&Session{}).Error
}
