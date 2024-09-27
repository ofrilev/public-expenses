package pagination

func CalcLimit(pageSize int, totalItems int) int {
	if pageSize > totalItems {
		return 0
	} else {
		return pageSize
	}
}
