package main

import (
	"os"
	"strings"
)

func getFileName(fe *os.File) string {
	parts := strings.Split(fe.Name(), "/")
	return parts[len(parts)-1]
}
