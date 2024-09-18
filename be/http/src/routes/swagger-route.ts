import {NextFunction, Request, Response, Router} from "express";
const router = Router();
import swaggerUI, {JsonObject} from "swagger-ui-express";
import yaml from "js-yaml"
import fs from "fs"

router.use("/", swaggerUI.serve)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    swaggerUI.setup(
      yaml.load(
        fs.readFileSync(
          `${__dirname}/../swagger/index.yaml`,
          'utf8'
        )
      ) as JsonObject
    )(req, res, next)
  } catch (e) {
    next(e)
  }
});

export default router;
