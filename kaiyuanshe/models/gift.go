package models

import (
	"errors"

	"gorm.io/gorm"
)

type Gift struct {
	gorm.Model
	Name           string `json:"name"`            // 礼品名称
	Image          string `json:"image"`           // 礼品图片URL
	Description    string `json:"description"`     // 礼品描述
	PointsRequired int    `json:"points_required"` // 积分门槛
	Stock          int    `json:"stock"`           // 库存数量
	Category       string `json:"category"`        // 礼品分类
	SortOrder      int    `json:"sort_order"`      // 排序顺序
	IsActive       bool   `json:"is_active"`       // 是否激活
	EventID        uint   `json:"event_id"`        // 所属活动
	Event          *Event `gorm:"foreignKey:EventID" json:"event"`
}

// Gift 的 CRUD 操作
func (g *Gift) Create() error {
	return db.Create(g).Error
}

func (g *Gift) GetByID(id uint) error {
	return db.First(g, id).Error
}

func (g *Gift) GetByEventID(eventID uint) ([]Gift, error) {
	var gifts []Gift
	err := db.Where("event_id = ?", eventID).Order("sort_order ASC").Find(&gifts).Error
	return gifts, err
}

func (g *Gift) GetByEventIDAndActive(eventID uint) ([]Gift, error) {
	var gifts []Gift
	err := db.Where("event_id = ? AND is_active = ?", eventID, true).Order("sort_order ASC").Find(&gifts).Error
	return gifts, err
}

func (g *Gift) GetByEventIDAndCategory(eventID uint, category string) ([]Gift, error) {
	var gifts []Gift
	err := db.Where("event_id = ? AND category = ? AND is_active = ?", eventID, category, true).Order("sort_order ASC").Find(&gifts).Error
	return gifts, err
}

func (g *Gift) GetCategoriesByEventID(eventID uint) ([]string, error) {
	var categories []string
	err := db.Model(&Gift{}).Where("event_id = ?", eventID).Distinct().Pluck("category", &categories).Error
	return categories, err
}

func (g *Gift) Update() error {
	if g.ID == 0 {
		return errors.New("missing gift ID")
	}
	return db.Save(g).Error
}

func (g *Gift) Delete() error {
	if g.ID == 0 {
		return errors.New("missing gift ID")
	}
	return db.Delete(g).Error
}

// 更新礼品库存
func (g *Gift) UpdateStock(newStock int) error {
	if g.ID == 0 {
		return errors.New("missing gift ID")
	}
	return db.Model(g).Update("stock", newStock).Error
}

// 减少礼品库存
func (g *Gift) DecreaseStock(quantity int) error {
	if g.ID == 0 {
		return errors.New("missing gift ID")
	}
	if g.Stock < quantity {
		return errors.New("insufficient stock")
	}
	return db.Model(g).Update("stock", gorm.Expr("stock - ?", quantity)).Error
}

// 批量删除某个活动的所有礼品
func DeleteGiftsByEventID(eventID uint) error {
	return db.Where("event_id = ?", eventID).Delete(&Gift{}).Error
}

// 根据积分门槛查询可用礼品
func GetAvailableGiftsByPoints(eventID uint, userPoints int) ([]Gift, error) {
	var gifts []Gift
	err := db.Where("event_id = ? AND points_required <= ? AND is_active = ? AND stock > 0",
		eventID, userPoints, true).Order("points_required DESC").Find(&gifts).Error
	return gifts, err
}
