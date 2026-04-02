const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// --- SUPABASE CONNECTION ---
const supabaseUrl = 'https://eslhufyhllrubjxstyob.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbGh1ZnlobGxydWJqeHN0eW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMzQ0NTQsImV4cCI6MjA5MDcxMDQ1NH0.AoZ2CdIPbk8jupPfqRyTUYhy6lO6s47ED07g_TISI94'; 
const supabase = createClient(supabaseUrl, supabaseKey);

// --- ROUTES ---

// 1. ADDED THIS: The "Root" route to stop the "Cannot GET /" error
app.get("/", (req, res) => {
    res.send("Server is live and connected to Supabase!");
});

// 2. Route to store (Insert) user data
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase
        .from('Googlemail')
        .insert([{ email, password }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json({ message: "Stored in Supabase!" }); 
});

// 3. Route to see (Select) all users
app.get("/users", async (req, res) => {
    const { data, error } = await supabase
        .from('Googlemail')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

// --- UPDATED PORT SETTING ---
// Render needs process.env.PORT to work!
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
