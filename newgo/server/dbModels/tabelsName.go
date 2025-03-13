package dbModels

type TBN struct {
	ExpensesTable        string
	CategoriesTable      string
	MonthlyProgressTable string
	UsersTable           string
	RolesTable           string
	UserRolesTable       string
}

var TableNames = &TBN{ExpensesTable: "expenses", CategoriesTable: "categories", MonthlyProgressTable: "monthly_progress", UsersTable: "users", RolesTable: "roles", UserRolesTable: "user_roles"}
