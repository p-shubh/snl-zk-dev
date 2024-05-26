package sln_sui_dboperation

import (
	"net/http"
	dbflow "snl/dbFlow"
	"snl/model"
	gamecreatedeploy "snl/sui_snl/smartContractDeploy/gameCreateDeploy"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateSlnSui(c *gin.Context) {

	var newSlnSui model.SlnSui
	var db, lbpq = dbflow.ConnectHackDatabase()
	defer lbpq.Close()
	if err := c.ShouldBind(&newSlnSui); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	newSlnSui.CreatedAt = time.Now()
	newSlnSui.ContractAddress = gamecreatedeploy.GameCreateDeploy()

	// Save the new record to the database
	if err := db.Create(&newSlnSui).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the created record as JSON
	c.JSON(http.StatusOK, newSlnSui)
}
