# Cadastro de carro

### **RF**

- Deve ser possível cadastrar um novo carro

### **RN**

- Não deve ser possível cadastrar um carro com uma placa já cadastrada

- Quando cadastrado, por padrão, o carro deve estar disponível

- O usuário responsável pelo cadastro deve ser um usuário administrador

# Listagem de carros

### **RF**

- Deve ser possível listar todos os carros disponíveis

- Deve ser possível listar todos os carros disponível pelo nome da marca

- Deve ser possível listar todos os carros disponível pelo nome da categoria

- Deve ser possível listar todos os carros disponível pelo nome do carro

### **RN**

- Para visualizar os carros disponíveis o usuário não precisa estar logado no sistema

# Cadastro de especificação no carro

### **RF**

- Deve ser possível cadastrar uma especificação para um carro

- Deve ser possível listar todas as especificações

- Deve ser possível listar todos os carros

### **RN**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado

- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro

- O usuário responsável pelo cadastro de uma especificação deve ser um usuário administrador

# Cadastro de imagens do Carro

### **RF**

- Deve ser possível cadastrar a imagem do carro

- Deve ser possível listar todos os carros

### **RNF**

- Utilizar o multer para upload dos arquivos

### **RN**

- Deve ser possível cadastrar mais de uma imagem para o mesmo carro

- O usuário responsável pelo cadastro das imagens deve ser um usuário administrador

# Aluguel de carro

### **RF**

- Deve ser possível cadastrar um aluguel

### **RN**

- O aluguel deve ter duração mínima de 24 horas

- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário

- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro

- O usuário deve estar logado na aplicação

- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Devolução de carro

### **RF**

- Deve ser possível realizar a devolução de um carro alugado

### **RN**

- Se o carro for devolvido com menos de 24 horasm deverá ser cobrado a diária completa

- Ao realizar a devolução, o carro deverá ser liberado para poder ser alugado novamente

- Ao realizar a devolução, o usuário deverá ser liberado para poder alugar novamente

- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso

- Caso haja multa, deverá ser somado ao total do aluguel

- O usuário deve estar logado na aplicação
