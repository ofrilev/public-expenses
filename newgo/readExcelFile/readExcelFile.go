package readExcelFromFile

import (
	"fmt"
	"io"
	"os"

	"github.com/thedatashed/xlsxreader"
)

type ExcelData struct {
	SheetsNum int
	Data      [][]string
}
type InsertSheet struct {
	i               int
	endOfSheetIndex int
}

func exitIfError(e error) {
	if e != nil {
		fmt.Println("exit with error:", e)
		os.Exit(1)
	}
}

func readCellFromSheet(xl *xlsxreader.XlsxFile, sheet *InsertSheet) [][]string {
	var result [][]string
	i := 0
	for row := range xl.ReadRows(xl.Sheets[sheet.i]) {
		i++
		if i > 3 {
			var rowValues []string
			for _, cell := range row.Cells {
				rowValues = append(rowValues, cell.Value)
			}
			result = append(result, rowValues)
		}
	}
	result = result[:len(result)-2]
	sheet.endOfSheetIndex = len(result) + 1
	return append(result, []string{"end-of-sheet"})
}

func ReadExcelFromFile(f *os.File) ExcelData {
	bytes, err := io.ReadAll(f)
	exitIfError(err)

	xl, err := xlsxreader.NewReader(bytes)
	exitIfError(err)

	if len(xl.Sheets) < 1 {
		fmt.Println("The provided Excel file does not have enough sheets.")
		os.Exit(1)
	}

	res := [][]string{}
	InsertSheets := &[]InsertSheet{}
	for i, sh := range xl.Sheets {
		if sh == "עסקאות במועד החיוב" || sh == "עסקאות חו\"ל ומט\"ח" {
			sheet := InsertSheet{i: i}
			res = append(res, readCellFromSheet(xl, &sheet)...)
			*InsertSheets = append(*InsertSheets, sheet)
		}
	}
	if len(*InsertSheets) > 1 {
		fstSheet := (*InsertSheets)[0]
		sndSheet := (*InsertSheets)[1]
		heads := res[:fstSheet.endOfSheetIndex]
		tail := res[fstSheet.endOfSheetIndex+1 : sndSheet.endOfSheetIndex+fstSheet.endOfSheetIndex]
		res = append(heads, tail...)
	}
	// memory cleanup
	defer func() {
		InsertSheets = nil
	}()

	return ExcelData{Data: res, SheetsNum: len(*InsertSheets)}
}
