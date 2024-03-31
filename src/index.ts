import { Ai } from '@cloudflare/ai'
import { Hono } from 'hono'

export interface Env {
	AI: any
}

const app = new Hono()

app.get("/", async c => {
	if (c.env) {
		const ai = new Ai(c.env.AI)

		const messages = [
			{ role: "system", content: "you are a very funny comedian and you like emojis" },
			{ role: "user", content: "tell me a joke about cloudflare" },
		]

		const res = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", { messages })
		return c.json(res)
	}

	return c.json({ error: "missing env" })
})

export default app
