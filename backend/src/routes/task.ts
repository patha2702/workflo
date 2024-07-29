import { Router, Request, Response } from "express";
import { taskSchema } from "../schemas/taskSchema";
import { authMiddleware } from "../middleware/auth";

const router = Router()

router.use(authMiddleware)

router.post("/", (req: Request, res:Response) => {
    
})

router.get("/", (req: Request, res: Response) => {
    
})

router.get("/:id", (req: Request, res: Response) => {

})

router.put("/", (req: Request, res: Response) => {

})

router.delete("/", (req: Request, res: Response) => {

})

export default router