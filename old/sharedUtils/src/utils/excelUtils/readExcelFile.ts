const XlSX = require('xlsx')

// Reading our test file
export const readExcelFile = (filePath: string): string[] => {
    try {
        const file = XlSX.readFile(filePath)

        let data: string[] = []

        const sheets = file.SheetNames

        for (let i = 0; i < sheets.length; i++) {
            const temp = XlSX.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res: string) => {
                    data.push(<string>res)
                }
            )
        }
        if (data.length < 2) {
            throw new Error('unable to read file')
        } else {
            return (data)
        }
    } catch
        (err) {
        console.log(`unable to read file ${filePath}, with err ${err}`)
        return [""];
    }
}

