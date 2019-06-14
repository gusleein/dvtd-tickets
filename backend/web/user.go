package web

import (
	"../db"
	"../helpers"
	"../smsAero"
	"github.com/AlexeySpiridonov/goapp-config"
	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttprouter"
)

func UserAuth(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	item := db.User{}
	helpers.JsonUnmarshal(string(ctx.Request.Body()), &item)
	log.Debug(item)
	code, err := db.Users.Auth(item.Name,
		helpers.PreparePhone(item.Phone),
		item.Os,
		item.Version,
		item.Device)
	if err != nil {
		log.Error(err)
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}

	if config.GetEnv() != "dev" {
		smsAero.Send(helpers.PreparePhone(item.Phone), "Ваш код входа: "+code)
	}

	helpers.OutputJSON(ctx, 200, true)
}

type confirmUser struct {
	Phone string `json:"phone"`
	Code  string `json:"code"`
}

func UserConfirm(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	item := confirmUser{}
	helpers.JsonUnmarshal(string(ctx.Request.Body()), &item)
	log.Debug(item)
	user, err := db.Users.Confirm(helpers.PreparePhone(item.Phone), item.Code)
	if err != nil {
		log.Error(err)
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputJSON(ctx, 200, user)
}

func UserSave(ctx *fasthttp.RequestCtx, user db.User) {
	item := db.User{}
	helpers.JsonUnmarshal(string(ctx.Request.Body()), &item)
	log.Debug(item, user.Id)

	user.Name = item.Name
	user.Email = item.Email
	user.Save()
	helpers.OutputJSON(ctx, 200, user)
}
