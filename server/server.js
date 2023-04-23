const express=require("express");
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const cors=require("cors");

const registerRoutes=require("./routes/registerRoutes");
const loginRoutes=require("./routes/loginRoutes");
const projectsRoutes=require("./routes/projectsRoutes");
const projectViewRoutes=require("./routes/projectViewRoutes")

const PORT= process.env.PORT || 3001;

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/projects", projectsRoutes);
app.use("/project-view", projectViewRoutes);

app.listen(PORT, ()=>{
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
});