package models

import (
	"errors"

	"gorm.io/gorm"
)

type Member struct {
	gorm.Model
	Name        string     `json:"name"`    // 嘉宾姓名
	Avatar      string     `json:"avatar"`  // 头像URL
	Title       string     `json:"title"`   // 职位/头衔
	Company     string     `json:"company"` // 公司/组织
	CommunityID uint       `json:"community_id"`
	Community   *Community `gorm:"foreignKey:CommunityID" json:"community"`
	UserId      uint       `json:"user_id"`
	User        *User      `gorm:"foreignKey:UserId" json:"user"`
}

func (m *Member) Create() error {
	return db.Create(m).Error
}

func (m *Member) GetByID(id uint) error {
	return db.First(m, id).Error
}

func (m *Member) GetByCommunityID(communityID uint) ([]Member, error) {
	var members []Member
	err := db.Where("community_id = ?", communityID).Find(&members).Error
	return members, err
}

func (m *Member) Update() error {
	if m.ID == 0 {
		return errors.New("missing member ID")
	}
	return db.Save(m).Error
}

func (m *Member) Delete() error {
	if m.ID == 0 {
		return errors.New("missing member ID")
	}
	return db.Delete(m).Error
}

func DeleteMemberByCommunityID(communityID uint) error {
	return db.Where("community_id = ?", communityID).Delete(&Member{}).Error
}
