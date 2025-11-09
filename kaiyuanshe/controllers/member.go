package controllers

import (
	"fmt"
	"kaiyuanshe/models"
	"kaiyuanshe/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreatMember(c *gin.Context) {
	idParam := c.Param("communityId")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid ID", nil)
		return
	}

	var community = new(models.Community)
	community.ID = uint(id)

	err = community.GetByID(uint(id))
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "community is not exist", nil)
		return
	}

	var req CreateMemberRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Println(err)
		utils.ErrorResponse(c, http.StatusBadRequest, "invalid args", nil)
		return
	}

	var member = models.Member{
		Name:   req.Name,
		Avatar: req.Avatar,
		Title:  req.Title,
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

	member.UserId = userId
	member.CommunityID = community.ID

	// 创建数据库记录
	if err := member.Create(); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "create success", member)
}

func GetMember(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid ID", nil)
		return
	}

	var member models.Member
	member.ID = uint(id)

	if err = member.GetByID(uint(id)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid member", nil)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "success", member)
}

func DeleteMember(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid ID", nil)
		return
	}
	var member models.Member
	member.ID = uint(id)

	if err = member.GetByID(uint(id)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid Member", nil)
		return
	}

	if err := member.Delete(); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to delete member", nil)
		return
	}
	utils.SuccessResponse(c, http.StatusOK, "delete success", nil)
}

func UpdateMember(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid ID", nil)
		return
	}

	var req UpdateMemberRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid input data", nil)
		return
	}

	var member models.Member
	member.ID = uint(id)

	if err = member.GetByID(uint(id)); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid Member", nil)
		return
	}

	member.Name = req.Name
	member.Avatar = req.Avatar
	member.Title = req.Title

	if err := member.Update(); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update member", nil)
		return
	}
	utils.SuccessResponse(c, http.StatusOK, "success", member)
}
