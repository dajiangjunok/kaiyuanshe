package controllers

import (
	"fmt"
	"kaiyuanshe/models"
	"kaiyuanshe/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreatCommunity(c *gin.Context) {
	var req CreateCommunityRequest

	// 将 JSON 请求体绑定到 event 结构体
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Println(err)
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid args", nil)
		return
	}

	startD, err := utils.ParseTime(req.StartDate)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid args", nil)
		return
	}

	var community = models.Community{
		City:         req.City,
		Intro:        req.Intro,
		Cover:        req.Cover,
		StartDate:    &startD,
		RegisterLink: req.RegisterLink,
	}

	uid, ok := c.Get("uid")
	if !ok {
		utils.ErrorResponse(c, http.StatusUnauthorized, "unauthorized", nil)
		return
	}

	userId, ok := uid.(uint)
	if !ok {
		utils.ErrorResponse(c, http.StatusUnauthorized, "unauthorized", nil)
		return
	}

	community.UserId = userId
	// 创建数据库记录
	if err := community.Create(); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "create success", community)
}

func GetCommunity(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid ID", nil)
		return
	}

	var community models.Community
	community.ID = uint(id)

	if err = community.GetByID(uint(id)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid Community", nil)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "success", community)
}

func QueryCommunity(c *gin.Context) {
	keyword := c.Query("keyword")
	city := c.Query("city")
	order := c.DefaultQuery("order", "desc")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "6"))

	filter := models.CommunityFilter{
		Keyword:   keyword,
		City:      city,
		OrderDesc: order == "desc",
		Page:      page,
		PageSize:  pageSize,
	}

	communities, total, err := models.QueryCommunitys(filter)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	var response = QueryCommunityResponse{
		Communities: communities,
		Page:        page,
		PageSize:    pageSize,
		Total:       total,
	}

	utils.SuccessResponse(c, http.StatusOK, "query success", response)
}

func DeleteCommunity(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid ID", nil)
		return
	}
	var community models.Community
	community.ID = uint(id)

	if err = community.GetByID(uint(id)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid Community", nil)
		return
	}

	if err := community.Delete(); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to delete community", nil)
		return
	}
	utils.SuccessResponse(c, http.StatusOK, "delete success", nil)
}

func UpdateCommunity(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid ID", nil)
		return
	}

	var req UpdateCommunityRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid input data", nil)
		return
	}

	var community models.Community
	community.ID = uint(id)

	if err = community.GetByID(uint(id)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid Community", nil)
		return
	}

	community.City = req.City
	community.Intro = req.Intro
	community.Cover = req.Cover
	community.RegisterLink = req.RegisterLink

	startD, err := utils.ParseTime(req.StartDate)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid args", nil)
		return
	}
	community.StartDate = &startD

	if err := community.Update(); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update community", nil)
		return
	}
	utils.SuccessResponse(c, http.StatusOK, "success", community)
}
