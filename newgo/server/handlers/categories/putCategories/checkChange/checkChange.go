package checkchange

import (
	"net/http"
	"newgo/dbModels"
	"newgo/server/handlers/categories/utils"
	"newgo/server/handlers/categories/utils/bodyParamsHandle"

	"gorm.io/gorm"
)

// CheckChange checks if the category can be updated
// It checks if the category with the given ID exists,
// if the category is not a parent and a new parent is provided,
// if the category's name is not the same as its siblings.
// Returns a boolean indicating whether the category can be updated,
// and an integer indicating the HTTP status code if not.
func CheckChange(categoryId int, bpo bodyParamsHandle.BodyParamObj, db *gorm.DB) utils.ResultObj {
	var category dbModels.Category
	db.First(&category, categoryId)
	if category.ID == 0 {
		return utils.ResultObj{
			Success: false,
			Status:  http.StatusNotFound,
			Msg:     "Category not found",
		}
	}
	if category.ParentID == 0 && bpo.Parent != 0 {
		return utils.ResultObj{
			Success: false,
			Status:  http.StatusBadRequest,
			Msg:     "Cannot change parent of a root category",
		}
	}
	if bpo.Name != "" {
		var siblingsCategories []dbModels.Category
		db.Where("parent = ?", category.ParentID).Find(&siblingsCategories)
		for _, sibling := range siblingsCategories {
			if sibling.ID != category.ID && sibling.Category == bpo.Name {
				return utils.ResultObj{
					Success: false,
					Status:  http.StatusConflict,
					Msg:     "Category name already exists under this parent",
				}
			}
		}
	}
	if bpo.Parent != 0 {
		var parent = dbModels.Category{}
		db.Where("id = ?", bpo.Parent).First(&parent)
		if parent.ID == 0 {
			return utils.ResultObj{
				Success: false,
				Status:  http.StatusNotFound,
				Msg:     "New parent doest not exist",
			}
		}
	}
	if bpo.Parent != 0 && category.ParentID == bpo.Parent {
		return utils.ResultObj{
			Success: false,
			Status:  http.StatusBadRequest,
			Msg:     "Cannot change parent to the same parent",
		}
	}
	if bpo.Name != "" && category.Category == bpo.Name {
		return utils.ResultObj{
			Success: false,
			Status:  http.StatusBadRequest,
			Msg:     "Cannot change name to the same name",
		}
	}
	return utils.ResultObj{
		Success: true,
	}
}
