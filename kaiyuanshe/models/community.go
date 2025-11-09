package models

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Community struct {
	gorm.Model
	City         string     `json:"city"`
	Intro        string     `json:"intro"`
	Cover        string     `json:"cover"`
	Active       uint       `json:"active"`
	StartDate    *time.Time `json:"start_date"`
	RegisterLink string     `json:"register_link"`
	Events       []Event    `gorm:"foreignKey:CommunityID" json:"events"`
	Members      []Member   `gorm:"foreignKey:CommunityID" json:"members"`
	UserId       uint       `json:"user_id"`
	User         *User      `gorm:"foreignKey:UserId" json:"user"`
}

func (c *Community) Create() error {
	return db.Create(c).Error
}

func (c *Community) GetByID(id uint) error {
	return db.Preload("Members").Preload("Events").First(c, id).Error
}

func GetCommunityByCity(city string) (Community, error) {
	var community Community
	err := db.Model(&Community{}).Where("city LIKE ?", "%"+city+"%").First(community).Error
	if err != nil {
		return community, err
	}
	return community, nil

}

func (c *Community) Update() error {
	if c.ID == 0 {
		return errors.New("missing community ID")
	}
	return db.Save(c).Error
}

func (c *Community) Delete() error {
	if c.ID == 0 {
		return errors.New("missing Community ID")
	}
	return db.Delete(c).Error
}

type CommunityFilter struct {
	Keyword   string // 标题或描述关键词
	City      string
	OrderDesc bool // 是否按创建时间倒序
	Page      int  // 当前页码，从 1 开始
	PageSize  int  // 每页数量，建议默认 10
}

func QueryCommunitys(filter CommunityFilter) ([]Community, int64, error) {
	var communitys []Community
	var total int64

	query := db.Model(&Community{})

	if filter.Keyword != "" {
		likePattern := "%" + filter.Keyword + "%"
		query = query.Where("title ILIKE ? OR description ILIKE ?", likePattern, likePattern)
	}

	if filter.City != "" {
		query = query.Where("city = ?", filter.City)
	}

	// 统计总数（不加 limit 和 offset）
	query.Count(&total)

	// 排序
	if filter.OrderDesc {
		query = query.Order("start_date desc")
	} else {
		query = query.Order("start_date asc")
	}

	// 分页
	if filter.Page < 1 {
		filter.Page = 1
	}
	if filter.PageSize <= 0 {
		filter.PageSize = 10
	}
	offset := (filter.Page - 1) * filter.PageSize
	query = query.Offset(offset).Limit(filter.PageSize)

	err := query.Find(&communitys).Error
	return communitys, total, err
}
