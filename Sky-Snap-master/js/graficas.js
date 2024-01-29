// Graficas
const ctx = document.getElementById('grafica1');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{
      label: 'Precipitación',
      data: numerosRandom(),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 12,
            family: 'Outfit, sans-serif',
            weight: 200  
          },
          textShadow: '0 0 4px rgb(3, 3, 3)'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
          font: {
            size: 14,
            family: 'Outfit, sans-serif',
            weight: 200  
          },
          textShadow: '0 0 4px rgb(3, 3, 3)'
        }
      }
    },
    plugins: {
      legend: { 
        labels: {
          color: 'white',
          fontSize: 14,
          fontFamily: 'Outfit, sans-serif',
          textShadow: '0 0 4px rgb(3, 3, 3)',
          fontStyle: 'light'
        }
      } 
    }
  }
})
const cttx = document.getElementById('grafica2');
new Chart(cttx, {
  type: 'bar',
  data: {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    datasets: [{
      label: 'Precipitacion',
      data: numerosRandom(),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 12,
            family: 'Outfit, sans-serif'
          },
          textShadow: '0 0 4px rgb(3, 3, 3)'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
          font: {
            size: 14,
            family: 'Outfit, sans-serif'
          },
          textShadow: '0 0 4px rgb(3, 3, 3)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
          fontSize: 14,
          fontFamily: 'Outfit, sans-serif',
          textShadow: '0 0 4px rgb(3, 3, 3)'
        }
      },
      
    }
  }
});
const ctxx = document.getElementById('grafica3');
new Chart(ctxx, {
    type: 'line',
    data: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        datasets: [{
            label: 'Humedad',
            data: numerosRandom(),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                ticks: {
                    color: 'white',
                    font: {
                        size: 12,
                        family: 'Outfit, sans-serif'
                    },
                    textShadow: '0 0 4px rgb(3, 3, 3)'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                    font: {
                        size: 14,
                        family: 'Outfit, sans-serif'
                    },
                    textShadow: '0 0 4px rgb(3, 3, 3)'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    fontSize: 14,
                    fontFamily: 'Outfit, sans-serif',
                    textShadow: '0 0 4px rgb(3, 3, 3)'
                }
            },
        }
    }
});
function numerosRandom() {
    let numerosRandom = [];
    for (let i = 0; i < 7; i++) {  
        const numRandom = Math.floor(Math.random() * 20);
        numerosRandom.push(numRandom);
    }
    return numerosRandom;
}

