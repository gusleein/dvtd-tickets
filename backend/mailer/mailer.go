package mailer

import (
	"fmt"
	"github.com/AlexeySpiridonov/goapp-config"
	"net/mail"
	"net/smtp"
)

type Email struct {
	From    string
	To      string
	Bcc     string
	Subject string
	Msg     string
}

func (email *Email) Send() error {
	// Set up authentication information.
	// @TODO: move it to Config
	auth := smtp.PlainAuth(
		"",
		config.Local.Get("authEmail"),
		config.Local.Get("authPass"),
		config.Local.Get("smtp"),
	)

	from := mail.Address{Name: "mgrk", Address: email.From}
	to := mail.Address{Name: "", Address: email.To}

	// setup a map for the headers
	header := make(map[string]string)
	header["From"] = from.String()
	header["To"] = to.String()
	header["Subject"] = email.Subject

	// setup the message
	message := ""
	for k, v := range header {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + email.Msg

	return smtp.SendMail(
		config.Local.Get("smtp")+":"+config.Local.Get("port"),
		auth,
		email.From,
		[]string{email.To},
		[]byte(message),
	)
}
