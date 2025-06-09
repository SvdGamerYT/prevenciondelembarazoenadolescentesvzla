document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de Partículas ---
    if(document.getElementById('particles-js')){
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#e63946" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#f7808b", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // --- Lógica del Test Interactivo ---
    const testContainer = document.querySelector('.test-container');
    if (testContainer) {
        const preguntasData = [
            {
                pregunta: "1. ¿Cuál es el único método anticonceptivo que también protege contra la mayoría de las Infecciones de Transmisión Sexual (ITS)?",
                opciones: ["Pastillas anticonceptivas", "Preservativo (condón)", "DIU (Dispositivo Intrauterino)"],
                correcta: 1
            },
            {
                pregunta: "2. La píldora anticonceptiva de emergencia (del día después)...",
                opciones: ["Debe usarse como método regular.", "Es abortiva.", "Es solo para emergencias y no debe usarse de forma regular."],
                correcta: 2
            },
            {
                pregunta: "3. Para asegurar la máxima eficacia de las pastillas anticonceptivas, se deben tomar...",
                opciones: ["Solo los días que tienes relaciones sexuales.", "Todos los días, preferiblemente a la misma hora.", "Una vez a la semana."],
                correcta: 1
            },
            {
                pregunta: "4. ¿Cuál de estas afirmaciones sobre el embarazo adolescente es FALSA?",
                opciones: ["No puedes quedar embarazada en tu primera relación sexual", "El embarazo puede ocurrir en cualquier relación sexual sin protección", "Los adolescentes necesitan educación sexual integral"],
                correcta: 0
            },
            {
                pregunta: "5. ¿Qué método anticonceptivo tiene la mayor eficacia?",
                opciones: ["Preservativo", "DIU", "Píldora anticonceptiva"],
                correcta: 1
            }
        ];
        
        let preguntaActual = 0;
        const respuestas = new Array(preguntasData.length);

        function renderizarTest() {
            const p = preguntasData[preguntaActual];
            testContainer.innerHTML = `
                <div class="pregunta activa">
                    <h3>${p.pregunta}</h3>
                    <div class="opciones">
                        ${p.opciones.map((opcion, index) => `
                            <div class="opcion" data-index="${index}">${opcion}</div>
                        `).join('')}
                    </div>
                </div>
                <div class="botones-test">
                    <button class="boton-test boton-anterior" ${preguntaActual === 0 ? 'disabled' : ''}>Anterior</button>
                    <button class="boton-test boton-siguiente" ${respuestas[preguntaActual] === undefined ? 'disabled' : ''}>
                        ${preguntaActual === preguntasData.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </button>
                </div>
            `;
            addTestListeners();
        }

        function addTestListeners() {
            testContainer.querySelectorAll('.opcion').forEach(opcion => {
                opcion.addEventListener('click', () => {
                    const selectedIndex = parseInt(opcion.dataset.index);
                    respuestas[preguntaActual] = selectedIndex === preguntasData[preguntaActual].correcta;
                    testContainer.querySelectorAll('.opcion').forEach(o => o.classList.remove('seleccionada'));
                    opcion.classList.add('seleccionada');
                    testContainer.querySelector('.boton-siguiente').disabled = false;
                });
            });
            
            testContainer.querySelector('.boton-siguiente').addEventListener('click', () => {
                if (preguntaActual < preguntasData.length - 1) {
                    preguntaActual++;
                    renderizarTest();
                } else {
                    mostrarResultados();
                }
            });
            
            testContainer.querySelector('.boton-anterior').addEventListener('click', () => {
                if (preguntaActual > 0) {
                    preguntaActual--;
                    renderizarTest();
                }
            });
        }

        function mostrarResultados() {
            const correctas = respuestas.filter(r => r).length;
            const puntaje = (correctas / preguntasData.length) * 100;
            let recomendacion = '';
            
            if (puntaje < 60) {
                recomendacion = '¡Hay mucho por aprender! Te recomendamos explorar con calma la información de nuestra página y consultar con un profesional de la salud.';
            } else if (puntaje < 100) {
                recomendacion = '¡Buen trabajo! Tienes conocimientos sólidos, pero siempre es bueno repasar y mantenerse informado.';
            } else {
                recomendacion = '¡Excelente! Tienes un gran conocimiento sobre el tema. ¡Comparte esta información con tus amistades!';
            }
            
            testContainer.innerHTML = `
                <div class="resultado-test" style="display: block;">
                    <h3>¡Resultados del Test!</h3>
                    <p>Tu puntuación es:</p>
                    <div class="puntuacion">${puntaje.toFixed(0)}%</div>
                    <p>Respondiste correctamente ${correctas} de ${preguntasData.length} preguntas.</p>
                    <div class="recomendaciones">${recomendacion}</div>
                    <button class="boton-test boton-siguiente" id="reiniciar-test" style="margin-top: 1rem;">Intentar de Nuevo</button>
                </div>
            `;
            
            document.getElementById('reiniciar-test').addEventListener('click', () => {
                preguntaActual = 0;
                respuestas.fill(undefined);
                renderizarTest();
            });
        }
        
        renderizarTest();
    }

    // --- Lógica de la Calculadora ---
    const formCalculadora = document.getElementById('calculadora-form');
    if(formCalculadora) {
        formCalculadora.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fechaInicioStr = document.getElementById('fecha-ultimo-periodo').value;
            const duracionCiclo = parseInt(document.getElementById('duracion-ciclo').value);
            
            if(!fechaInicioStr){ 
                alert("Por favor, selecciona la fecha de tu último periodo."); 
                return; 
            }
            
            const fechaInicio = new Date(fechaInicioStr + 'T00:00:00');
            const proximoPeriodo = new Date(fechaInicio);
            proximoPeriodo.setDate(proximoPeriodo.getDate() + duracionCiclo);
            
            const ovulacion = new Date(proximoPeriodo);
            ovulacion.setDate(ovulacion.getDate() - 14);
            
            const inicioFertil = new Date(ovulacion);
            inicioFertil.setDate(ovulacion.getDate() - 5);
            
            const finFertil = new Date(ovulacion);
            finFertil.setDate(ovulacion.getDate() + 1);
            
            const formatoFecha = { day: 'numeric', month: 'long', year: 'numeric' };
            
            document.getElementById('proximo-periodo-resultado').textContent = 
                `Próximo periodo estimado: ${proximoPeriodo.toLocaleDateString('es-VE', formatoFecha)}`;
            
            document.getElementById('dias-fertiles-resultado').textContent = 
                `Tus días más fértiles son aproximadamente del ${inicioFertil.toLocaleDateString('es-VE', formatoFecha)} al ${finFertil.toLocaleDateString('es-VE', formatoFecha)}.`;
            
            document.querySelector('.resultado-calculadora').style.display = 'block';
        });
    }
    
    // --- Lógica del Chatbot ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const cerrarChatbot = chatbotContainer.querySelector('.cerrar-chatbot');
    const chatInput = chatbotContainer.querySelector('input');
    const chatSendBtn = chatbotContainer.querySelector('button');
    const chatMessages = chatbotContainer.querySelector('.chatbot-mensajes');
    
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('abierto');
        if (chatbotContainer.classList.contains('abierto') && chatMessages.children.length === 0) {
            addMessage("¡Hola! Soy tu asistente virtual. Pregúntame sobre métodos anticonceptivos, causas del embarazo adolescente o dónde buscar ayuda.", 'bot');
        }
    });
    
    cerrarChatbot.addEventListener('click', () => chatbotContainer.classList.remove('abierto'));
    
    const respuestasBot = {
        "hola": "¡Hola! ¿En qué puedo ayudarte? Pregúntame sobre 'métodos', 'causas', 'ayuda' o 'emergencia'.",
        "causas": "Las principales causas del embarazo adolescente incluyen: falta de educación sexual integral, acceso limitado a métodos anticonceptivos, presión social, mitos sobre la sexualidad, y falta de comunicación familiar.",
        "metodos": "Existen varios métodos anticonceptivos: preservativos (únicos que protegen de ITS), pastillas anticonceptivas, inyecciones, DIU, parches y píldora de emergencia. Consulta siempre a un profesional de la salud.",
        "preservativo": "El preservativo o condón es el único método que protege tanto del embarazo como de las ITS. Tiene una eficacia del 82-98% cuando se usa correctamente.",
        "pastillas": "Las pastillas anticonceptivas deben tomarse diariamente a la misma hora. Tienen una eficacia del 91-99%. No protegen de ITS.",
        "emergencia": "La píldora de emergencia debe tomarse lo antes posible, máximo 72 horas después de una relación sin protección. No es abortiva y no debe usarse como método regular.",
        "ayuda": "Puedes buscar ayuda en: centros de salud públicos, hospitales, PLAFAM, AVESA, o cualquier centro de planificación familiar. La atención es confidencial.",
        "embarazo": "Si sospechas un embarazo, es importante hacer una prueba y buscar atención médica. Existen opciones y apoyo disponible.",
        "its": "Las Infecciones de Transmisión Sexual se previenen principalmente con el uso del preservativo. Si tienes síntomas, busca atención médica inmediata.",
        "gracias": "¡De nada! Estoy aquí para ayudarte con información sobre salud sexual y reproductiva. ¿Hay algo más en lo que pueda ayudarte?"
    };
    
    function addMessage(text, sender) {
        const message = document.createElement('div');
        message.classList.add('mensaje', `mensaje-${sender}`);
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function handleChat() {
        const userText = chatInput.value.trim();
        if(!userText) return;
        
        addMessage(userText, 'usuario');
        chatInput.value = '';
        
        setTimeout(() => {
            const userTextLower = userText.toLowerCase();
            let botResponse = "No entendí muy bien tu pregunta. Intenta usar palabras clave como 'métodos', 'causas', 'ayuda', 'emergencia', 'preservativo', 'pastillas' o 'its'.";
            
            for (const key in respuestasBot) {
                if (userTextLower.includes(key)) { 
                    botResponse = respuestasBot[key]; 
                    break; 
                }
            }
            
            addMessage(botResponse, 'bot');
        }, 800);
    }
    
    chatSendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { 
        if(e.key === 'Enter') handleChat(); 
    });

    // --- Navegación suave ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});