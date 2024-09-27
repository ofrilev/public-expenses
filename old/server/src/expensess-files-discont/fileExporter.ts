import * as path from 'path';

const filePath = ['02.01.23.xlsx', '02.02.23.xlsx', '02.03.23.xlsx', '02.04.23.xlsx','02.05.23.xlsx', '02.06.22.xlsx', '02.07.22.xlsx',
     '02.08.22.xlsx'
    , '02.09.22.xlsx'
    , '02.10.22.xlsx'
    , '02.11.22.xlsx'
    , '02.12.22.xlsx']

export const FilePaths = filePath.map((fileName) => `/Users/ofri.levkowitz/expensess-project/server/src/expensess-files-discont/${fileName}`)
