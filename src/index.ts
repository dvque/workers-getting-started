import { Ai } from '@cloudflare/ai'
import { Hono } from 'hono'

export interface Env {
	AI: any
}

const app = new Hono()

// from BROWSER: GET /?query="How is your day today?"
// from TERMINAL: http localhost:8787 query=="How is your day today?"
app.get("/", async c => {

	if (c.env) {
		const ai = new Ai(c.env.AI)
		const content = c.req.query("query") || "How is your day today?"
		const messages = [
			{ role: "system", content: "You are a friendly assistant" },
			{ role: "user", content },
		]

		const res = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", { messages })
		return c.json(res)
	}

	return c.json({ error: "missing env" })
})

export default app
