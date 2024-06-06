const mensajeError = document.getElementsByClassName("error")[0]

document.getElementById("login-form").addEventListener("submit",async (e)=>{
  e.preventDefault();
  const user = e.target.children.user.value;
  const password = e.target.children.password.value;
  const res = await fetch("http://localhost:4000/api/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      user,password
    })
  });
  if(!res.ok) return mensajeError.classList.toggle("escondido",false);
  const resJson = await res.json();
  if(resJson.redirect){
    window.location.href = resJson.redirect;
  }
})

// La conexión a base de datos deberia ser realizada en el archivo app/index.js y no en el archivo app/controllers/authentication.controller.js ya que la conexión a base de datos es una configuración global de la aplicación y no una configuración de un controlador en específico.

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos', err.stack);
  } else {
    console.log('Conectado a la base de datos');
  }
});

module.exports = pool;