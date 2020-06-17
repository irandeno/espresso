import { Application } from '../application.ts'
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const port = 8080
const app = new Application({ port: 8080 })

app.start()

async function request(suffix: string = '') {
	const r = await fetch(`http://localhost:${port}${suffix}`)

	return await r.text()
}

Deno.test('Get Route', async () => {
	app.get('/', (req: any) => {
        assertEquals(req.method,'GET')
		return 'Hello, World!'
	})
	const content = await request()

    assertEquals(content,'Hello, World!')
})

Deno.test('Post Route', async () => {
	app.post('/', (req: any) => {
        assertEquals(req.method,'GET')
		return 'Hello, World!'
	})
	const content = await request()

    assertEquals(content,'Hello, World!')
})
