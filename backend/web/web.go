package web

import (
	"encoding/json"

	"../db"
	"../helpers"
	"github.com/op/go-logging"
	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttprouter"
)

var log = logging.MustGetLogger("web")

func Auth(handler func(ctx *fasthttp.RequestCtx, user db.User)) func(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	return func(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
		token := string(ctx.Request.Header.Peek("_t"))

		formData := make(map[string]string)
		json.Unmarshal(ctx.Request.Body(), &formData)

		for key, value := range formData {
			ctx.QueryArgs().Set(key, value)
		}

		if len(token) > 0 {
			user, err := db.Users.GetByToken(token)
			if err == nil {
				handler(ctx, user)
				return
			}
		}
		helpers.OutputJsonMessageResult(ctx, 401, "Auth reguired")
	}
}

func Admin(handler func(ctx *fasthttp.RequestCtx, user db.User)) func(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	return func(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
		token := string(ctx.Request.Header.Peek("_t"))

		formData := make(map[string]string)
		json.Unmarshal(ctx.Request.Body(), &formData)

		for key, value := range formData {
			ctx.QueryArgs().Set(key, value)
		}

		if len(token) > 0 {
			user, err := db.Users.GetByToken(token)
			if err == nil && user.Admin == true {
				handler(ctx, user)
				return
			}
		}
		helpers.OutputJsonMessageResult(ctx, 401, "Auth reguired")
	}
}
