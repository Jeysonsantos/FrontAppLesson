# Use a imagem Node.js como a imagem base
FROM node:20 as node

# Defina o diretório de trabalho para o diretório do aplicativo Angular
WORKDIR /app

# Copie os arquivos necessários para o contêiner
COPY . .

# Instale as dependências do Node.js
RUN npm install 

# Instale o Angular CLI globalmente
RUN npm install -g @angular/cli

# Compile o aplicativo Angular para produção
RUN npm run build --prod

# Segunda fase: Use a imagem Nginx para servir os arquivos estáticos
FROM nginx:1.21

# Copie os arquivos compilados do aplicativo Angular para o diretório padrão do Nginx
COPY --from=node /app/dist/front /usr/share/nginx/html

# Exponha a porta 80 para acesso externo
EXPOSE 80
