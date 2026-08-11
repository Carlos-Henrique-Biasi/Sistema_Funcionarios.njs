-- Criar o banco de dados
CREATE DATABASE empresa;

-- Selecionar o banco
USE empresa;

-- Tabela de empresas
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de funcionários
CREATE TABLE funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    empresa_id INT NOT NULL,

    -- Chave estrangeira
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);