const express = require('express');
const connection = require('./db');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');


router.get('/cadastros', (req, res) => {
  connection.query('SELECT * FROM cadastros', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      return res.status(500).json({ error: 'Erro ao buscar os registros' });
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/cadastros/:idCadastro', (req, res) => {
  const { idCadastro } = req.params;
  connection.query('SELECT * FROM cadastros WHERE idCadastro = ?', [idCadastro], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      return res.status(500).json({ error: 'Erro ao buscar o registro' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    res.json(results[0]);
  });
});

// Rota para criar um novo registro
router.post('/cadastros', (req, res) => {
  const { nome, email, senha, role } = req.body;

  // Verifique se o email já existe
  connection.query('SELECT * FROM cadastros WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erro ao verificar o email:', err);
      return res.status(500).json({ error: 'Erro ao verificar o email' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'Email já está cadastrado' });
    }

    // Se o email não existir, insira o novo registro
    connection.query('INSERT INTO cadastros (nome, email, senha, role) VALUES (?, ?, ?, ?)',
      [nome, email, senha, role], (err, result) => {
        if (err) {
          console.error('Erro ao criar o registro:', err);
          return res.status(500).json({ error: 'Erro ao criar o registro' });
        }
        res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
      });
  });
});


// Rota para atualizar um registro existente pelo ID
router.delete('/cadastros/:idCadastro', (req, res) => {
  const { idCadastro } = req.params;
  connection.query('DELETE FROM cadastros WHERE idCadastro = ?', [idCadastro], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      return res.status(500).json({ error: 'Erro ao excluir o registro' });
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});

// Rota para excluir um registro pelo ID
router.delete('/cadastros/:idCadastro', (req, res) => {
  const { idCadastro } = req.params;
  connection.query('DELETE FROM cadastro WHERE idCadastro = ?', [idCadastro], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      return res.status(500).json({ error: 'Erro ao excluir o registro' });
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});

////////////////////////////////////////Login/////////////////////////////////////////////////
// Rota de login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Consulta para verificar se o usuário existe
  connection.query('SELECT * FROM cadastros WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    // Verifica se o usuário foi encontrado
    if (results.length > 0) {
      const user = results[0];
      res.json({
        message: 'Login bem-sucedido!',
        role: user.role,
      });
    } else {
      return res.status(401).json({ error: 'Email ou senha incorretos!' });
    }
  });
});

// Rota para listar todos os registros de login
router.get('/Login', (req, res) => {
  connection.query('SELECT * FROM Login', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      return res.status(500).json({ error: 'Erro ao buscar os registros' });
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/Login/:idLogin', (req, res) => {
  const { idLogin } = req.params;
  connection.query('SELECT * FROM Login WHERE idLogin = ?', [idLogin], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      return res.status(500).json({ error: 'Erro ao buscar o registro' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    res.json(results[0]);
  });
});

// Rota para criar um novo registro de login
router.post('/Login', (req, res) => {
  const { email, senha } = req.body;

  connection.query('INSERT INTO Login (email, senha) VALUES (?, ?)', [email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      return res.status(500).json({ error: 'Erro ao criar o registro' });
    }
    res.status(201).json({ message: 'Registro criado com sucesso', idLogin: result.insertId });
  });
});

// Rota para atualizar um registro de login existente pelo ID
router.put('/Login/:idLogin', (req, res) => {
  const { idLogin } = req.params;
  const { email, senha } = req.body;

  connection.query('UPDATE Login SET email = ?, senha = ? WHERE idLogin = ?', [email, senha, idLogin], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o registro' });
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// Rota para excluir um registro de login pelo ID
router.delete('/Login/:idLogin', (req, res) => {
  const { idLogin } = req.params;

  connection.query('DELETE FROM Login WHERE idLogin = ?', [idLogin], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      return res.status(500).json({ error: 'Erro ao excluir o registro' });
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});




////////////////////////////////////////Contato//////////////////////////////////////////////////////

// Rota para listar todos os registros
router.get('/contato', (req, res) => {
  connection.query('SELECT * FROM contato', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/contato/:idContato', (req, res) => {
  const { idContato } = req.params;
  connection.query('SELECT * FROM contato WHERE idContato = ?', [idContato], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Rota para criar um novo registro
router.post('/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  connection.query('INSERT INTO contato (nome, email_ou_telefone, mensagem) VALUES (?, ?, ?)',
    [nome, email, mensagem], (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ error: 'Erro ao criar o registro' });
        return;
      }
      res.status(201).json({ message: 'Registro criado com sucesso', idContato: result.insertId });
    });
});

// Rota para atualizar um registro existente pelo ID
router.put('/contato/:idContato', (req, res) => {
  const { idContato } = req.params;
  const { nome, email_ou_telefone, mensagem } = req.body;
  connection.query('UPDATE contato SET nome = ?, email_ou_telefone = ?, mensagem = ? WHERE idContato = ?',
    [nome, email_ou_telefone, mensagem, idContato], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o registro:', err);
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
});

// Rota para excluir um registro pelo ID
router.delete('/contato/:idContato', (req, res) => {
  const { idContato } = req.params;
  connection.query('DELETE FROM contato WHERE idContato = ?', [idContato], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});


//////////////////////////////////////Funcionarios///////////////////////////////

// Rota para listar todos os médicos
router.get('/medicos', (req, res) => {
  const query = 'SELECT * FROM medicos';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao consultar médicos:', err);
      res.status(500).send('Erro no servidor');
      return;
    }
    res.json(results);
  });
});

// Rota para adicionar um médico
router.post('/medicos', (req, res) => {
  const { nome, especialidade, numeroRegistro, horarioTrabalho, status, plantao } = req.body;
  const query = 'INSERT INTO medicos (nome, especialidade, numeroRegistro, horarioTrabalho, status, plantao) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(query, [nome, especialidade, numeroRegistro, horarioTrabalho, status, plantao], (err) => {
    if (err) {
      console.error('Erro ao adicionar médico:', err);
      res.status(500).send('Erro no servidor');
      return;
    }
    res.status(201).send('Médico adicionado com sucesso');
  });
});

// Rota para editar um médico
router.put('/medicos/:idMedico', (req, res) => {
  const { idMedico } = req.params;
  const { nome, especialidade, numeroRegistro, horarioTrabalho, status, plantao } = req.body;
  const query = 'UPDATE medicos SET nome = ?, especialidade = ?, numeroRegistro = ?, horarioTrabalho = ?, status = ?, plantao = ? WHERE idMedico = ?'; // Alterado para idMedico

  connection.query(query, [nome, especialidade, numeroRegistro, horarioTrabalho, status, plantao, idMedico], (err) => {
    if (err) {
      console.error('Erro ao editar médico:', err);
      res.status(500).send('Erro no servidor');
      return;
    }
    res.send('Médico editado com sucesso');
  });
});

// Rota para excluir um médico
router.delete('/medicos/:idMedico', (req, res) => {
  const { idMedico } = req.params;
  const query = 'DELETE FROM medicos WHERE idMedico = ?';

  connection.query(query, [idMedico], (err) => {
    if (err) {
      console.error('Erro ao excluir médico:', err);
      res.status(500).send('Erro no servidor');
      return;
    }
    res.send('Médico excluído com sucesso');
  });
});

/////////////////////////////////////Agendamentos//////////////////////////////

// Configurar o diretório para onde os arquivos serão enviados
const documentosPath = path.join(__dirname, 'documentos');

// Configuração do Multer para armazenar arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, documentosPath);  // Salva os arquivos na pasta 'documentos'
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;  // Usar o nome original do arquivo
    cb(null, fileName);  // Salva com o nome original do arquivo
  }
});

// Inicializa o Multer com a configuração de storage
const upload = multer({ storage });

// Rota para upload de documentos
router.post('/upload', upload.single('file'), (req, res) => {
  const { file } = req;  // Pega o arquivo enviado
  const originalFileName = file.originalname;  // Nome original do arquivo
  const uploadTime = new Date();  // Hora atual do upload

  // Insere o nome do arquivo e o timestamp no banco de dados
  const query = 'INSERT INTO documentos (nome, upload_time) VALUES (?, ?)';
  connection.query(query, [originalFileName, uploadTime], (err, results) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      return res.status(500).json({ message: 'Erro ao salvar o documento.' });
    }

    // Retorna sucesso ao cliente
    res.status(200).json({ message: 'Arquivo enviado com sucesso!', file: originalFileName });
  });
});





module.exports = router;


