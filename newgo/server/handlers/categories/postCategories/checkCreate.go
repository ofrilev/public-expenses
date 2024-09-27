package postcategories

import (
	"net/http"
	"newgo/dbModels"
	"newgo/server/handlers/categories/utils"
	"newgo/server/handlers/categories/utils/bodyParamsHandle"

	"gorm.io/gorm"
)

func CheckCreate(bpo bodyParamsHandle.BodyParamObj, db *gorm.DB) utils.ResultObj {
	if bpo.Parent != 0 {
		var parentCategory dbModels.Category
		db.First(&parentCategory, bpo.Parent)
		if parentCategory.ID == 0 {
			return utils.ResultObj{
				Success: false,
				Msg:     "Parent category not found",
				Status:  http.StatusNotFound,
			}
		}
		var siblingsCategories []dbModels.Category
		db.Where("parent = ?", bpo.Parent).Find(&siblingsCategories)
		for i := range siblingsCategories {
			if siblingsCategories[i].Category == bpo.Name {
				return utils.ResultObj{
					Success: false,
					Msg:     "Category name already exists under that parent",
					Status:  http.StatusConflict,
				}
			}
		}
	} else {
		var category dbModels.Category
		db.Find(&category, "category = ?", bpo.Name)
		if category.ID != 0 {
			return utils.ResultObj{
				Success: false,
				Msg:     "Parent category name already exists",
				Status:  http.StatusConflict,
			}
		}
	}
	return utils.ResultObj{Success: true}

}
