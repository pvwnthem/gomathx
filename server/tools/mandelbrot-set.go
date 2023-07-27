package tools

import (
	"image"
	"image/color"
	"image/png"

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

func GetMandelbrotImage(width, height int, offsetX, offsetY, zoom float64, maxIterations int) image.Image {
	img := image.NewRGBA(image.Rect(0, 0, width, height))

	for x := 0; x < width; x++ {
		for y := 0; y < height; y++ {
			a := (float64(x)/float64(width)-0.5)*zoom*4 + offsetX
			b := (float64(y)/float64(height)-0.5)*zoom*4 + offsetY

			img.Set(x, y, Mandelbrot(a, b, offsetX, offsetY, zoom, maxIterations))
		}
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
