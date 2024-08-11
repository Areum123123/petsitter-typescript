import express from "express";
import authRouter from "../routers/auth.router";
import petsitterRouter from "./petsitter.router";
import reservationRouter from "./reservation.router";
import userRouter from "./user.router";
import reviewRouter from "./review.router";
import logRouter from "./reservation-logs.router";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/pet-sitters", petsitterRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/reservations", reservationRouter);
apiRouter.use("/", logRouter);
export default apiRouter;
