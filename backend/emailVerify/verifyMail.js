import nodemailer from "nodemailer"
import "dotenv/config"
//https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
export const verifyMail = async (token, email) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	})
	const mailConfigurations = {
		from: process.env.MAIL_USER,
		to: email,
		subject: "Email Verification",
		text: `Please verify your email`,
	}

	transporter.sendMail(mailConfigurations, function (error, info) {
		if (error) {
			throw new Error(error)
		}
		console.log("Email sent: " + info.response)
	})
}