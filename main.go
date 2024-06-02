package router

import (
	"net/http"
	"os"
	suiSlnRouter "snl/sui_snl/ApiRouting"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

var (
	ginApp = gin.Default()
)

func CORS(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "*")
	c.Header("Access-Control-Allow-Headers", "*")

	if c.Request.Method != "OPTIONS" {
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusOK)
	}
}
func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": 200, "message": "Server is UP and running",
	})
}
func HandleRequest() {
	if os.Getenv("APP_MODE_DEBUG") == "" {
		gin.SetMode(gin.ReleaseMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}
	ginApp.Use(CORSMiddleware())

	ginApp.Use(static.Serve("/", static.LocalFile("./web", false)))

	ginApp.GET("/healthcheck", HealthCheck)

	// no route redirect to frontend app
	ginApp.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"status": 404, "message": "Invalid Endpoint Request"})
	})
	ApplyRoutes(&ginApp.RouterGroup)

	ginApp.Run(":6060")
}

func ApplyRoutes(r *gin.RouterGroup) {
	v1 := r.Group("/v1.0")
	{
		suiSlnRouter.SuiSlnApplyRoutes(v1)
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
