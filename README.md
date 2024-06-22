Documentação da API de Usuário e Refeição
Descrição
Esta API permite o registro, autenticação de usuários e a criação de refeições com upload de imagem. Ela utiliza Express, Mongoose, bcrypt, jsonwebtoken, multer e outras bibliotecas para gerenciar autenticação e manipulação de arquivos.

Estrutura do Projeto
bash
Copiar código
.
├── models
│   ├── Usuario.js
│   ├── Refeicao.js
├── routes
│   ├── usuario.js
│   ├── refeicao.js
├── uploads
│   └── # Pasta onde as imagens serão armazenadas
├── .env
├── server.js
└── package.json
Configuração do Ambiente
Crie um arquivo .env na raiz do projeto e defina a variável SECRET para o token JWT:

plaintext
Copiar código
SECRET=your_jwt_secret_key
Instalação
Clone o repositório:

bash
Copiar código
git clone <repository_url>
cd <repository_directory>
Instale as dependências:

bash
Copiar código
npm install
Inicie o servidor:

bash
Copiar código
npm start
Endpoints
Rota de Usuário
Registro de Usuário
POST /usuario/registrar

json
Copiar código
{
    "nome": "string",
    "email": "string",
    "senha": "string",
    "confirmarsenha": "string"
}
Respostas:

201 Created - Usuário criado com sucesso.
422 Unprocessable Entity - Validação falhou (e.g., campos obrigatórios faltando, senhas não conferem, email já registrado).
500 Internal Server Error - Erro no servidor.
Login de Usuário
POST /usuario/login

json
Copiar código
{
    "email": "string",
    "senha": "string"
}
Respostas:

200 OK - Autenticação realizada com sucesso, retorna um token.
404 Not Found - Usuário não encontrado.
422 Unprocessable Entity - Senha inválida.
500 Internal Server Error - Erro no servidor.
Logout de Usuário (Demonstrativo)
POST /usuario/logout

Respostas:

200 OK - Logout realizado com sucesso.
Rota de Refeição
Criar Refeição com Upload de Imagem
POST /refeicao/criar-refeicao

Headers:

plaintext
Copiar código
Authorization: Bearer <token>
Body (multipart/form-data):

nome (string) - Nome da refeição.
descricao (string) - Descrição da refeição.
foto (file) - Imagem da refeição (opcional).
Respostas:

201 Created - Refeição criada com sucesso.
400 Bad Request - Falha na validação (e.g., campos obrigatórios faltando).
401 Unauthorized - Token não fornecido ou inválido.
500 Internal Server Error - Erro no servidor.
Middlewares
checkToken
Middleware para verificar a validade do token JWT. Este middleware deve ser utilizado em rotas protegidas para garantir que apenas usuários autenticados possam acessá-las.

javascript
Copiar código
function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado! Token não fornecido.' });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token inválido!' });
  }
}
multer
Middleware para upload de arquivos, configurado para armazenar imagens na pasta uploads/.

javascript
Copiar código
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
Modelos
Usuário
Modelo para o esquema de usuário.

javascript
Copiar código
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
Refeição
Modelo para o esquema de refeição.

javascript
Copiar código
const mongoose = require('mongoose');

const RefeicaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  foto: { type: String },
});

module.exports = mongoose.model('Refeicao', RefeicaoSchema);
Observações
A segurança da API depende do segredo JWT (SECRET) configurado no arquivo .env. Mantenha esse segredo seguro.
Certifique-se de que a pasta uploads/ tem as permissões adequadas para armazenar imagens.
Valide adequadamente os dados de entrada para evitar injeções de código e outras vulnerabilidades.
Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
