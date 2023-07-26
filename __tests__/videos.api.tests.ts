import request from "supertest";
import {videosRouter} from "../src/router/videos-router";

describe('/', () => {
    it('should return 200 and empty array', () => {
        request(videosRouter)
            .get('/')
            .expect(200, [])
    })


})