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

CREATE TABLE faturamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(15,2) NOT NULL,
    motivo VARCHAR(200),
    dataF DATE NOT NULL,
    empresa_id INT NOT NULL,

    -- Chave estrangeira
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

CREATE TABLE despesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(15,2) NOT NULL,
    motivo VARCHAR(250),
    dataD DATE NOT NULL,
    empresa_id INT NOT NULL,

    --chave estrangeira 
    FOREIGN KEY(empresa_id) REFERENCES empresas(id)
);

CREATE TABLE receita(
    empresa_id INT PRIMARY KEY,
    valor DECIMAL(15,2),

    --chave estrangeira
    FOREIGN KEY(empresa_id) REFERENCES empresas(id)
);