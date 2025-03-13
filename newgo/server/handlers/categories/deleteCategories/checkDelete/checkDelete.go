package checkdelete

import (
	"net/http"
	"server/dbModels"
	"server/handlers/categories/utils"
	"gorm.io/gorm"
)

func CheckDelete(categoryId int, db *gorm.DB) utils.ResultObj {

	var category = dbModels.Category{}
	var checkDelete = db.Find(&category, categoryId)

	if category.ParentID == 0 {
		var c int64
		db.Where("parent = ?", categoryId).Count(&c)
		if c > 0 {
			return utils.ResultObj{
				Success: false,
				Msg:     "Cannot delete parent category with children",
				Status:  http.StatusBadRequest,
			}
		}
	}
	if checkDelete.RowsAffected == 0 {
		return utils.ResultObj{
			Success: false,
			Msg:     "Category not found",
			Status:  http.StatusNotFound,
		}
	}
	return utils.ResultObj{
		Success: true,
	}

}
