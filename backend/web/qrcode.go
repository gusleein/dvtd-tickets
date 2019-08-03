package web

import (
	"../db"
	"../helpers"
	"github.com/skip2/go-qrcode"
	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttprouter"
)

func QRCreate(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	userId := string(ctx.QueryArgs().Peek("user"))
	eventId := string(ctx.QueryArgs().Peek("event"))

	ticket, err := db.Users.CreateTicket(userId, eventId)
	path := ticket.GetQrCodeUri()

	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}

	// создаем картинку на сервере
	err = qrcode.WriteFile(ticket.Uid, qrcode.Medium, 256, path)
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, "Error on server")
		return
	}
	helpers.OutputJSON(ctx, 200, ticket)
}
