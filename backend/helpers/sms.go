package helpers

import (
	"math/rand"
	"strings"
	"time"
)

var seededRand = rand.New(rand.NewSource(time.Now().UnixNano()))

func StringWithIntset(length int) string {
	intset := "0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = intset[seededRand.Intn(len(intset))]
	}
	return string(b)
}

func PreparePhone(p string) (r string) {
	r = strings.Replace(p, " ", "", -1)
	r = strings.Replace(r, "-", "", -1)
	r = strings.Replace(r, ".", "", -1)
	r = strings.Replace(r, "+", "", -1)
	r = strings.Replace(r, "/", "", -1)
	r = strings.Replace(r, "+", "", -1)
	r = strings.Replace(r, "*", "", -1)
	return r
}
