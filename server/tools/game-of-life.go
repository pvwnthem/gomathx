package tools

import (
	"github.com/gin-gonic/gin"
)

// Represents the grid for Conway's Game of Life
type Grid [][]int

// Function to compute the next generation of the grid
func GetNextGeneration(current Grid) Grid {
	rows := len(current)
	cols := len(current[0])
	nextGen := make(Grid, rows)
	for i := range nextGen {
		nextGen[i] = make([]int, cols)
	}

	// Helper function to count the live neighbors of a cell
	countLiveNeighbors := func(row, col int) int {
		liveCount := 0
		for r := row - 1; r <= row+1; r++ {
			for c := col - 1; c <= col+1; c++ {
				if r >= 0 && r < rows && c >= 0 && c < cols && !(r == row && c == col) {
					liveCount += current[r][c]
				}
			}
		}
		return liveCount
	}

	// Apply the rules to compute the next generation
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			liveNeighbors := countLiveNeighbors(i, j)
			if current[i][j] == 1 {
				// Live cell
				if liveNeighbors < 2 || liveNeighbors > 3 {
					// Dies due to underpopulation or overpopulation
					nextGen[i][j] = 0
				} else {
					// Lives on to the next generation
					nextGen[i][j] = 1
				}
			} else {
				// Dead cell
				if liveNeighbors == 3 {
					// Becomes a live cell due to reproduction
					nextGen[i][j] = 1
				}
			}
		}
	}

	return nextGen
}

var (
	gridData Grid
)

func GetNextGridGeneration(c *gin.Context) {
	// Get the current grid from the request body
	var reqBody struct {
		Grid Grid `json:"grid"`
	}

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(400, gin.H{"error": "invalid request body"})
		return
	}

	// Get the next generation of the grid
	nextGeneration := GetNextGeneration(reqBody.Grid)
	gridData = nextGeneration

	c.JSON(200, gin.H{"grid": gridData})
}
