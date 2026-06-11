const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Configuración CORS correcta
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.error('❌ ERROR: GROQ_API_KEY no configurada en Render');
    process.exit(1);
}

// ✅ Endpoint principal
app.post('/api/groq', async (req, res) => {
    try {
        console.log('📨 Petición recibida');
        
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        console.log('✅ Respuesta enviada');
        res.json(data);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        status: '✅ Proxy SYSGOV funcionando',
        message: 'Envía POST a /api/groq'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Proxy corriendo en puerto ${PORT}`);
});