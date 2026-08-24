import express from "express";
import caseRoutes from "./routes/caseRoutes.js";
import cors from "cors";

import testRoutes from "./routes/testRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CodeCrime Backend is Running"
  });
});

app.use("/api/test", testRoutes);
app.use("/api/cases", caseRoutes);

export default app;