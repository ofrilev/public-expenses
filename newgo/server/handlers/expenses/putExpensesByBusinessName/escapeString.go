package putexpensesbybusinessname

import "strings"
func escapeSingleQuotes(input *string) {
	// Replaces every single quote with two single quotes
	*input = strings.ReplaceAll(*input, "'", "''")
}
