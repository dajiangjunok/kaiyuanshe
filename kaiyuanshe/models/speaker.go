package models

import (
	"errors"

	"gorm.io/gorm"
)

type Speaker struct {
	gorm.Model
	Name        string  `json:"name"`        // 嘉宾姓名
	Avatar      string  `json:"avatar"`      // 头像URL
	Title       string  `json:"title"`       // 职位/头衔
	Description string  `json:"description"` // 描述
	Company     string  `json:"company"`     // 公司/组织
	AgendaID    uint    `json:"agenda_id"`   // 所属议程
	Agenda      *Agenda `gorm:"foreignKey:AgendaID" json:"agenda"`
}

// Speaker 的 CRUD 操作
func (sp *Speaker) Create() error {
	return db.Create(sp).Error
}

func (sp *Speaker) GetByID(id uint) error {
	return db.First(sp, id).Error
}

func (sp *Speaker) GetByAgendaID(agendaID uint) ([]Speaker, error) {
	var speakers []Speaker
	err := db.Where("agenda_id = ?", agendaID).Find(&speakers).Error
	return speakers, err
}

func (sp *Speaker) GetByAgendaIDWithAgenda(agendaID uint) ([]Speaker, error) {
	var speakers []Speaker
	err := db.Preload("Agenda").Where("agenda_id = ?", agendaID).Find(&speakers).Error
	return speakers, err
}

func (sp *Speaker) GetBySessionID(sessionID uint) ([]Speaker, error) {
	var speakers []Speaker
	err := db.Joins("JOIN agendas ON speakers.agenda_id = agendas.id").
		Where("agendas.session_id = ?", sessionID).
		Find(&speakers).Error
	return speakers, err
}

func (sp *Speaker) GetByEventID(eventID uint) ([]Speaker, error) {
	var speakers []Speaker
	err := db.Joins("JOIN agendas ON speakers.agenda_id = agendas.id").
		Joins("JOIN sessions ON agendas.session_id = sessions.id").
		Where("sessions.event_id = ?", eventID).
		Find(&speakers).Error
	return speakers, err
}

func (sp *Speaker) Update() error {
	if sp.ID == 0 {
		return errors.New("missing speaker ID")
	}
	return db.Save(sp).Error
}

func (sp *Speaker) Delete() error {
	if sp.ID == 0 {
		return errors.New("missing speaker ID")
	}
	return db.Delete(sp).Error
}

// 批量删除某个议程的所有嘉宾
func DeleteSpeakersByAgendaID(agendaID uint) error {
	return db.Where("agenda_id = ?", agendaID).Delete(&Speaker{}).Error
}

// 批量删除某个会话的所有嘉宾
func DeleteSpeakersBySessionID(sessionID uint) error {
	return db.Joins("JOIN agendas ON speakers.agenda_id = agendas.id").
		Where("agendas.session_id = ?", sessionID).
		Delete(&Speaker{}).Error
}

// 根据嘉宾姓名搜索
func SearchSpeakersByName(name string) ([]Speaker, error) {
	var speakers []Speaker
	err := db.Where("name LIKE ?", "%"+name+"%").Find(&speakers).Error
	return speakers, err
}

// 获取某个活动的所有嘉宾（去重）
func GetUniqueSpeakersByEventID(eventID uint) ([]Speaker, error) {
	var speakers []Speaker
	err := db.Joins("JOIN agendas ON speakers.agenda_id = agendas.id").
		Joins("JOIN sessions ON agendas.session_id = sessions.id").
		Where("sessions.event_id = ?", eventID).
		Group("speakers.name, speakers.avatar, speakers.title").
		Find(&speakers).Error
	return speakers, err
}
