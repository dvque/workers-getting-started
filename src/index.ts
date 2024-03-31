import { Hono } from 'hono'

export interface Env { }

const app = new Hono()

app.get("/", c => {
	return c.json({ hello: 'hono' })
})

export default app
