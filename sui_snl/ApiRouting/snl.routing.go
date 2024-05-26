package suiSlnRouter

import (
	sln_sui_dboperation "snl/sui_snl/DBoperation"

	"github.com/gin-gonic/gin"
)

func SuiSlnApplyRoutes(r *gin.RouterGroup) {
	v1 := r.Group("/snl")
	{
		v1.POST("/insert-address", sln_sui_dboperation.CreateSlnSui)
	}
}
