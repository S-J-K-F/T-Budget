const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ✅ FIX CORS PROPERLY
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

// IMPORTANT: handle preflight requests
app.options('*', cors());

app.use(express.json());

// ---------------- USERS ----------------
const users = [
    { email: "teacher@test.com", password: "1234", role: "teacher" },
    { email: "admin@test.com", password: "1234", role: "admin" }
];

// ---------------- LOGIN ----------------
app.post('/api/login', (req, res) => {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    console.log("LOGIN ATTEMPT:", email, password);

    const user = users.find(u =>
        u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Invalid login" });
    }

    res.json({ success: true, user });
});

// ---------------- TEST ROUTE ----------------
app.get('/', (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});