package tools

import (
	"image"
	"image/color"
	"image/png"
	"runtime"

	"github.com/gin-gonic/gin"
)

func Mandelbrot(a, b, offsetX, offsetY, zoom float64, maxIterations int) color.Color {
	ca := a
	cb := b

	var n int
	for n = 0; n < maxIterations; n++ {
		aa := a*a - b*b
		bb := 2 * a * b

		a = aa + ca
		b = bb + cb

		if a*a+b*b > 4 {
			break
		}
	}

	brightness := uint8((float64(n) / float64(maxIterations)) * 255)
	return color.RGBA{brightness, brightness, brightness, 255}
}

func GetMandelbrotImagePart(img *image.RGBA, yStart, yEnd int, offsetX, offsetY, zoom float64, maxIterations int, done chan struct{}) {
	for y := yStart; y < yEnd; y++ {
		for x := 0; x < img.Bounds().Dx(); x++ {
			a := (float64(x)/float64(img.Rect.Dx())-0.5)*zoom*4 + offsetX
			b := (float64(y)/float64(img.Rect.Dy())-0.5)*zoom*4 + offsetY

			img.Set(x, y, Mandelbrot(a, b, offsetX, offsetY, zoom, maxIterations))
		}
	}
	done <- struct{}{}
}

func GetMandelbrotImage(width, height int, offsetX, offsetY, zoom float64, maxIterations int) image.Image {
	img := image.NewRGBA(image.Rect(0, 0, width, height))

	// Number of goroutines to use based on the number of CPU cores
	numGoroutines := runtime.NumCPU()
	done := make(chan struct{}, numGoroutines)

	// Calculate the number of rows each goroutine should process
	rowsPerGoroutine := height / numGoroutines

	for i := 0; i < numGoroutines; i++ {
		yStart := i * rowsPerGoroutine
		yEnd := (i + 1) * rowsPerGoroutine
		if i == numGoroutines-1 {
			yEnd = height // The last goroutine should process until the end
		}

		go GetMandelbrotImagePart(img, yStart, yEnd, offsetX, offsetY, zoom, maxIterations, done)
	}

	// Wait for all goroutines to finish
	for i := 0; i < numGoroutines; i++ {
		<-done
	}

	return img
}

func GetMandelbrot(c *gin.Context) {
	var reqBody struct {
		Width, Height    int
		OffsetX, OffsetY float64
		Zoom             float64
		MaxIterations    int
	}

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(400, gin.H{"error": "invalid request body"})
		return
	}

	// Generate the Mandelbrot image
	img := GetMandelbrotImage(reqBody.Width, reqBody.Height, reqBody.OffsetX, reqBody.OffsetY, reqBody.Zoom, reqBody.MaxIterations)

	// Encode the image as PNG and send it in the response
	c.Writer.Header().Set("Content-Type", "image/png")
	if err := png.Encode(c.Writer, img); err != nil {
		c.JSON(500, gin.H{"error": "failed to generate the Mandelbrot image"})
		return
	}
}
