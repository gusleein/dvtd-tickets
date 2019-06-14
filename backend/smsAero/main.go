package smsAero

import (
	"github.com/AlexeySpiridonov/goapp-config"
	"github.com/AlexeySpiridonov/smsaero"
	"github.com/op/go-logging"
)

var client *smsaero.Client
var log = logging.MustGetLogger("smsAero")

func init() {
	client = smsaero.NewClient(config.Local.Get("smsEmail"), config.Local.Get("smsAPIKey"), "", "")
}

func Send(number, text string) {
	log.Info(number, text)
	msg := smsaero.MessageRequest{
		Numbers: []string{number},
		Sign:    config.Local.Get("smsSign"),
		Text:    text,
		Channel: smsaero.ChannelDirect,
	}
	resp, err := client.Send(msg)

	if err != nil || resp.Success != true {
		log.Error(err, resp)
	}
	log.Debug(resp)
}
