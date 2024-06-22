Documentação da API de Usuário e Refeição
Descrição
Esta API permite realizar operações de registro, autenticação de usuários e criação de refeições com upload de imagem. Ela utiliza tecnologias como Express, Mongoose, bcrypt, jsonwebtoken e multer para oferecer funcionalidades robustas de gerenciamento de usuários e refeições.

Estrutura do Projeto
O projeto está organizado da seguinte maneira:

models/: Contém os modelos de dados da aplicação, como Usuario.js para o esquema de usuário e Refeicao.js para o esquema de refeição.
routes/: Define as rotas da API, incluindo usuario.js para as operações relacionadas a usuários e refeicao.js para as operações de refeições.
uploads/: Diretório onde as imagens das refeições são armazenadas.
.env: Arquivo de configuração onde são definidas variáveis de ambiente, como SECRET para o segredo usado na geração de tokens JWT.
server.js: Ponto de entrada da aplicação onde o servidor Express é configurado.
package.json: Arquivo que lista as dependências do projeto e define scripts npm.
Configuração do Ambiente
Antes de executar a aplicação, crie um arquivo .env na raiz do projeto e defina a variável SECRET com uma chave secreta para a geração de tokens JWT.

Instalação e Execução
Para iniciar o projeto:

Clone o repositório do projeto.
Instale as dependências usando o comando npm install.
Inicie o servidor com o comando npm start.
Funcionalidades
Registro de Usuário
Permite que novos usuários se registrem na aplicação fornecendo nome, email e senha. A senha é criptografada antes de ser armazenada no banco de dados.

Login de Usuário
Usuários registrados podem fazer login na aplicação fornecendo seu email e senha. Após a autenticação bem-sucedida, um token JWT é gerado e retornado para autenticar futuras requisições.

Criação de Refeição
Permite criar novas refeições, incluindo nome, descrição e opcionalmente uma imagem. A autenticação é necessária para acessar este endpoint, garantindo que apenas usuários autenticados possam adicionar novas refeições.

Middleware checkToken
Um middleware é utilizado para verificar a validade do token JWT em rotas protegidas. Ele verifica a presença do token no header de autorização e valida sua autenticidade antes de permitir o acesso às rotas protegidas.

Middleware multer
Utilizado para facilitar o upload de imagens das refeições. Configurado para armazenar as imagens na pasta uploads/.

Modelos de Dados
Usuário
O modelo de usuário define a estrutura de dados para armazenar informações como nome, email e senha criptografada.

Refeição
O modelo de refeição especifica como as informações de cada refeição são armazenadas, incluindo nome, descrição e um campo opcional para a localização da imagem associada.

Observações
A segurança da API depende do segredo JWT (SECRET) definido no arquivo .env. Mantenha este valor seguro e não compartilhe publicamente.
Certifique-se de que a pasta uploads/ possui permissões adequadas para armazenar e acessar as imagens das refeições.
Valide cuidadosamente todas as entradas de dados para evitar vulnerabilidades como injeção de código.
Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes sobre os termos de uso e distribuição.
