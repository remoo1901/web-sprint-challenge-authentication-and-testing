const supertest = require("supertest")
const server = require("../index")
const db = require("../database/dbConfig")

 
/*    beforeEach( async () => {
    await db.seed.run()
})   */

afterAll(async () => {
    await db.destroy()
})  
 
describe("auth", () => {
    it("GET /", async () => {
        const res = await supertest(server).get("/");
        expect(res.statusCode).toBe(200);
    });

    it("GET /users", async () => {
        const res = await supertest(server).get("/users");
        expect(res.statusCode).toBe(200);
    });

    it("POST /login", async () => {
        const res = await supertest(server).post("/login");
        expect(res.statusCode).toBe(200);
    })
  

    it("POST /register", async () => {
		const res = await supertest(server)
			.post("/register")
			.send({username: "ereny"})
		// expect(res.statusCode).toBe(201)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		//expect(res.body.id).toBeDefined()
			})
})

