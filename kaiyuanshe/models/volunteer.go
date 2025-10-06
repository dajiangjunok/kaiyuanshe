package models

import (
	"errors"

	"gorm.io/gorm"
)

type VolunteerCategory struct {
	gorm.Model
	Name        string      `json:"name"`        // 分类名称
	Description string      `json:"description"` // 分类描述
	Count       uint        `json:"count"`
	EventID     uint        `json:"event_id"` // 所属活动
	Event       *Event      `gorm:"foreignKey:EventID" json:"event"`
	Volunteers  []Volunteer `gorm:"foreignKey:CategoryID" json:"volunteers"` // 该分类下的志愿者
}

type Volunteer struct {
	gorm.Model
	Name       string             `json:"name"`        // 志愿者姓名
	Avatar     string             `json:"avatar"`      // 头像URL
	Title      string             `json:"title"`       // 职位/头衔
	Contact    string             `json:"contact"`     // 联系方式
	CategoryID uint               `json:"category_id"` // 所属分类
	Category   *VolunteerCategory `gorm:"foreignKey:CategoryID" json:"category"`
}

// VolunteerCategory 的 CRUD 操作
func (vc *VolunteerCategory) Create() error {
	return db.Create(vc).Error
}

func (vc *VolunteerCategory) GetByID(id uint) error {
	return db.First(vc, id).Error
}

func (vc *VolunteerCategory) GetByIDWithVolunteers(id uint) error {
	return db.Preload("Volunteers").First(vc, id).Error
}

func (vc *VolunteerCategory) GetByEventID(eventID uint) ([]VolunteerCategory, error) {
	var categories []VolunteerCategory
	err := db.Where("event_id = ?", eventID).Find(&categories).Error
	return categories, err
}

func (vc *VolunteerCategory) GetByEventIDWithVolunteers(eventID uint) ([]VolunteerCategory, error) {
	var categories []VolunteerCategory
	err := db.Preload("Volunteers").Where("event_id = ?", eventID).Find(&categories).Error
	return categories, err
}

func (vc *VolunteerCategory) Update() error {
	if vc.ID == 0 {
		return errors.New("missing volunteer category ID")
	}
	return db.Save(vc).Error
}

func (vc *VolunteerCategory) Delete() error {
	if vc.ID == 0 {
		return errors.New("missing volunteer category ID")
	}
	return db.Delete(vc).Error
}

// 批量删除某个活动的所有分类
func DeleteVolunteerCategoriesByEventID(eventID uint) error {
	return db.Where("event_id = ?", eventID).Delete(&VolunteerCategory{}).Error
}

// Volunteer 的 CRUD 操作
func (v *Volunteer) Create() error {
	return db.Create(v).Error
}

func (v *Volunteer) GetByID(id uint) error {
	return db.First(v, id).Error
}

func (v *Volunteer) GetByIDWithCategory(id uint) error {
	return db.Preload("Category").First(v, id).Error
}

func (v *Volunteer) GetByCategoryID(categoryID uint) ([]Volunteer, error) {
	var volunteers []Volunteer
	err := db.Where("category_id = ?", categoryID).Find(&volunteers).Error
	return volunteers, err
}

func (v *Volunteer) GetByEventID(eventID uint) ([]Volunteer, error) {
	var volunteers []Volunteer
	err := db.Joins("JOIN volunteer_categories ON volunteers.category_id = volunteer_categories.id").
		Where("volunteer_categories.event_id = ?", eventID).
		Find(&volunteers).Error
	return volunteers, err
}

func (v *Volunteer) GetByEventIDWithCategory(eventID uint) ([]Volunteer, error) {
	var volunteers []Volunteer
	err := db.Preload("Category").
		Joins("JOIN volunteer_categories ON volunteers.category_id = volunteer_categories.id").
		Where("volunteer_categories.event_id = ?", eventID).
		Find(&volunteers).Error
	return volunteers, err
}

func (v *Volunteer) Update() error {
	if v.ID == 0 {
		return errors.New("missing volunteer ID")
	}
	return db.Save(v).Error
}

func (v *Volunteer) Delete() error {
	if v.ID == 0 {
		return errors.New("missing volunteer ID")
	}
	return db.Delete(v).Error
}

// 批量删除某个分类的所有志愿者
func DeleteVolunteersByCategoryID(categoryID uint) error {
	return db.Where("category_id = ?", categoryID).Delete(&Volunteer{}).Error
}
