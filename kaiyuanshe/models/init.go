package models

import (
	"kaiyuanshe/config"
)

var db = config.DB

func init() {
	db.AutoMigrate(&Permission{})
	db.AutoMigrate(&PermissionGroup{})
	db.AutoMigrate(&Role{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Event{})
	db.AutoMigrate(&Recap{})
	db.AutoMigrate(&Article{})
	db.AutoMigrate(&Testnet{})
	db.AutoMigrate(&Category{})
	db.AutoMigrate(&Dapp{})
	db.AutoMigrate(&Tutorial{})
	db.AutoMigrate(&Feedback{})
	db.AutoMigrate(&Post{})
	db.AutoMigrate(&PostLike{})
	db.AutoMigrate(&PostFavorite{})
	db.AutoMigrate(&DailyStats{})
	db.AutoMigrate(&Follow{})
	db.AutoMigrate(&Session{})
	db.AutoMigrate(&Agenda{})
	db.AutoMigrate(&Speaker{})
	db.AutoMigrate(&VolunteerCategory{})
	db.AutoMigrate(&Volunteer{})
	db.AutoMigrate(&Gift{})

	InitRolesAndPermissions()
	InitCategories()
}
