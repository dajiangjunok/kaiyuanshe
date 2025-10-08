package controllers

import (
	"fmt"
	"kaiyuanshe/models"
	"kaiyuanshe/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateSession(c *gin.Context) {
	var req CreateSessionRequest

	// 从路由参数获取 eventId
	eventIDStr := c.Param("id")
	eventID, err := strconv.ParseUint(eventIDStr, 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid event id", nil)
		return
	}

	// 将 JSON 请求体绑定到 session 结构体
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Println(err)
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid args", nil)
		return
	}

	// 验证事件是否存在
	var event models.Event
	if err := event.GetByID(uint(eventID)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "event not found", nil)
		return
	}

	// 创建 session 对象，使用路由中的 eventID
	var session = models.Session{
		Title:       req.Title,
		Description: req.Description,
		Producer:    req.Producer,
		Volunteer:   req.Volunteer,
		EventID:     uint(eventID), // 使用路由参数中的 eventID
	}

	// 处理 agendas 数据
	var agendas []models.Agenda
	for _, agendaReq := range req.Agendas {
		startTime, err1 := utils.ParseTime(agendaReq.StartTime)
		endTime, err2 := utils.ParseTime(agendaReq.EndTime)
		if err1 != nil || err2 != nil {
			utils.ErrorResponse(c, http.StatusBadRequest, "invalid time format", nil)
			return
		}

		// 处理 speakers 数据
		var speakers []models.Speaker
		for _, speakerReq := range agendaReq.Speakers {
			speaker := models.Speaker{
				Name:        speakerReq.Name,
				Avatar:      speakerReq.Avatar,
				Title:       speakerReq.Title,
				Description: speakerReq.Description,
				Company:     speakerReq.Company,
			}
			speakers = append(speakers, speaker)
		}

		agenda := models.Agenda{
			Topic:     agendaReq.Topic,
			StartTime: &startTime,
			EndTime:   &endTime,
			Speakers:  speakers,
		}
		agendas = append(agendas, agenda)
	}

	session.Agendas = agendas

	// 创建数据库记录（包含关联数据）
	if err := session.CreateWithAgendasAndSpeakers(); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "create session success", session)
}

// 获取某个活动的所有会场
func GetSessionsByEvent(c *gin.Context) {
	// 从路由参数获取 eventId
	eventIDStr := c.Param("id")
	eventID, err := strconv.ParseUint(eventIDStr, 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid event id", nil)
		return
	}

	// 验证事件是否存在
	var event models.Event
	if err := event.GetByID(uint(eventID)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "event not found", nil)
		return
	}

	// 获取该活动的所有会场（包含议程和演讲者）
	var session models.Session
	sessions, err := session.GetByEventIDWithAgendasAndSpeakers(uint(eventID))
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "get sessions success", sessions)
}

// 删除会场
func DeleteSession(c *gin.Context) {
	// 从路由参数获取 eventId 和 venueId
	eventIDStr := c.Param("id")
	venueIDStr := c.Param("venueId")

	fmt.Println(eventIDStr)
	fmt.Println(venueIDStr)

	eventID, err1 := strconv.ParseUint(eventIDStr, 10, 32)
	venueID, err2 := strconv.ParseUint(venueIDStr, 10, 32)
	if err1 != nil || err2 != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid id", nil)
		return
	}

	// 验证事件是否存在
	var event models.Event
	if err := event.GetByID(uint(eventID)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "event not found", nil)
		return
	}

	// 验证会场是否存在且属于该活动
	var session models.Session
	if err := session.GetByID(uint(venueID)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "session not found", nil)
		return
	}

	// 检查会场是否属于该活动
	if session.EventID != uint(eventID) {
		utils.ErrorResponse(c, http.StatusBadRequest, "session does not belong to this event", nil)
		return
	}

	// 删除会场（GORM 的 Delete 方法会自动处理关联数据的删除，如果设置了级联删除）
	if err := session.Delete(); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "delete session success", nil)
}
