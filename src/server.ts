import express from "express";
import path from "path";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`[GITFLOW] Server running at http://localhost:${PORT}`);
});