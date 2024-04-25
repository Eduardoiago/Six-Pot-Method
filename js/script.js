let myChart;

    function formatMoney(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    function calcularPorcentagens() {
        const valor = parseFloat(document.getElementById('inputValor').value);
        if (isNaN(valor)) {
            message();
            return valor;
        }

        // 40% : Capital de Giro  
        // 20% : Aposentadoria
        // 15% : Caixa Emergêncial 
        // 10% : Investimentos
        // 10% : Entretenimentos
        // 05% : Doações e Presentes 

        const porcentagens = [40, 20, 15, 10, 10, 5];
        const resultados = porcentagens.map(porcentagem => (valor * porcentagem) / 100);

        if (myChart) {
            myChart.destroy(); 
        }

        const ctx = document.getElementById('chart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: porcentagens.map(p => `${p}%`),
                datasets: [{
                    label: 'Valores',
                    data: resultados,
                    backgroundColor: [
                        '#0A2239',
                        '#176087',
                        '#132E32',
                        '#1D84B5',
                        '#53A2BE',
                        '#87CEEB'
                    ],
                    borderColor: [
                        '#0A2239',
                        '#176087',
                        '#132E32',
                        '#1D84B5',
                        '#53A2BE',
                        '#87CEEB'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.formattedValue;
                                const index = context.dataIndex;
                                const resultado = resultados[index];
                                return `${label}: ${formatMoney(resultado)} (${porcentagens[index]}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    function message() {
        Toastify({
            text: "Por favor, insira um valor válido.",
            gravity: "top",
            duration: 3000,
            position: "right",
            close: true,
            style: {
                background: "linear-gradient(to right, #e60d0d, #300101)",
                boxShadow: 'none',   
            }
        }).showToast();
    }
