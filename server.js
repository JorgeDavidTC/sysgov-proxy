const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.error('❌ ERROR: GROQ_API_KEY no configurada en Render');
    process.exit(1);
}

app.post('/api/groq', async (req, res) => {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.json({ 
        status: '✅ Proxy SYSGOV funcionando',
        message: 'Envía POST a /api/groq con { messages: [...] }'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Proxy SYSGOV corriendo en puerto ${PORT}`);
});