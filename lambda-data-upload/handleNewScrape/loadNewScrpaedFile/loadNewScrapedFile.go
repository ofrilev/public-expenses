package loadnewscrpaedfile

import (
	"log"
	"os"
	"path/filepath"
	"strings"
)

func LoadNewFile() (*os.File, error) {
	//todo change the path according to the using function
	dir := "/tmp"
	// dir := "/Users/ofri.levkowitz/Desktop/excel"

	// Read the directory
	filesEntries, err := os.ReadDir(dir)

	if err != nil {
		log.Fatalf("Failed to read directory: %s", err)
	}

	// Iterate over the directory entries
	if len(filesEntries) > 0 {
		for _, entry := range filesEntries {
			if !entry.IsDir() && strings.HasSuffix(entry.Name(), ".xlsx") {
				// Construct the full file path
				filePath := filepath.Join(dir, entry.Name())

				// Read the file
				file, err := os.Open(filePath)
				if err != nil {
					log.Fatalf("Failed to read file %s: %s", entry.Name(), err)
					return nil, nil

				}
				return file, nil
			}
		}
	} else {
		log.Fatalf("no files at dir:%v", dir)
	}
	return nil, nil
}
