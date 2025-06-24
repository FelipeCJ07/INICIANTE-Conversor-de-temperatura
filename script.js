document.addEventListener('DOMContentLoaded', function() {
    const temperatureInput = document.getElementById('temperature-input');
    const sourceUnit = document.getElementById('source-unit');
    const conversionButtons = document.querySelectorAll('.conversion-btn');
    const resultValue = document.getElementById('result-value');
    const resultUnit = document.getElementById('result-unit');
    
    let currentSourceUnit = 'celsius';
    let currentTargetUnit = 'celsius';
    
    // Ativar botão de conversão
    function activateButton(button) {
        conversionButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        currentTargetUnit = button.dataset.target;
        convertTemperature();
    }
    
    // Converter temperatura
    function convertTemperature() {
        const inputValue = parseFloat(temperatureInput.value) || 0;
        let result;
        
        // Converter de Celsius para outras unidades
        if (currentSourceUnit === 'celsius') {
            if (currentTargetUnit === 'celsius') {
                result = inputValue;
            } else if (currentTargetUnit === 'fahrenheit') {
                result = (inputValue * 9/5) + 32;
            } else if (currentTargetUnit === 'kelvin') {
                result = inputValue + 273.15;
            }
        }
        // Converter de Fahrenheit para outras unidades
        else if (currentSourceUnit === 'fahrenheit') {
            if (currentTargetUnit === 'celsius') {
                result = (inputValue - 32) * 5/9;
            } else if (currentTargetUnit === 'fahrenheit') {
                result = inputValue;
            } else if (currentTargetUnit === 'kelvin') {
                result = (inputValue - 32) * 5/9 + 273.15;
            }
        }
        // Converter de Kelvin para outras unidades
        else if (currentSourceUnit === 'kelvin') {
            if (currentTargetUnit === 'celsius') {
                result = inputValue - 273.15;
            } else if (currentTargetUnit === 'fahrenheit') {
                result = (inputValue - 273.15) * 9/5 + 32;
            } else if (currentTargetUnit === 'kelvin') {
                result = inputValue;
            }
        }
        
        // Atualizar resultado
        resultValue.textContent = result.toFixed(2);
        
        // Atualizar unidade do resultado
        if (currentTargetUnit === 'celsius') {
            resultUnit.textContent = '°C';
        } else if (currentTargetUnit === 'fahrenheit') {
            resultUnit.textContent = '°F';
        } else if (currentTargetUnit === 'kelvin') {
            resultUnit.textContent = 'K';
        }
        
        // Efeito de animação
        resultValue.classList.remove('fade-in');
        void resultValue.offsetWidth; // Trigger reflow
        resultValue.classList.add('fade-in');
    }
    
    // Alternar unidade de origem
    sourceUnit.addEventListener('click', function() {
        if (currentSourceUnit === 'celsius') {
            currentSourceUnit = 'fahrenheit';
            sourceUnit.textContent = '°F';
        } else if (currentSourceUnit === 'fahrenheit') {
            currentSourceUnit = 'kelvin';
            sourceUnit.textContent = 'K';
        } else if (currentSourceUnit === 'kelvin') {
            currentSourceUnit = 'celsius';
            sourceUnit.textContent = '°C';
        }
        convertTemperature();
    });
    
    // Event listeners para botões de conversão
    conversionButtons.forEach(button => {
        button.addEventListener('click', function() {
            activateButton(this);
        });
    });
    
    // Event listener para input
    temperatureInput.addEventListener('input', convertTemperature);
    
    // Inicializar conversor
    convertTemperature();
});