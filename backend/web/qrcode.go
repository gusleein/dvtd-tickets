package web

import (
	"../helpers"
	"github.com/AlexeySpiridonov/goapp-config"
	"github.com/satori/go.uuid"
	"github.com/skip2/go-qrcode"
	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttprouter"
)

func QRCreate(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	t, _ := uuid.NewV4()

	err := qrcode.WriteFile("", qrcode.Medium, 256, config.Local.Get("frontDir")+"/uploads/"+t.String()+".png")
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, "Error on server")
		return
	}
	helpers.OutputJSON(ctx, 200, t.String()+".png")
}
