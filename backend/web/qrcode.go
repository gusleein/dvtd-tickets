package web

import (
	"../db"
	"../helpers"
	"github.com/skip2/go-qrcode"
	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttprouter"
)

func QRCreate(ctx *fasthttp.RequestCtx, ps fasthttprouter.Params) {
	userId := string(ps.ByName("userId"))
	partyId := string(ps.ByName("partyId"))

	ticket, err := db.Users.CreateTicket(userId, partyId)
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
