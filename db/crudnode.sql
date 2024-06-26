-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/06/2024 às 16:55
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `crudnode`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) NOT NULL,
  `id_etapa` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nome_card` varchar(200) NOT NULL,
  `solicitacao` text NOT NULL,
  `aprovacao` tinyint(1) NOT NULL,
  `colaboracao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cards`
--

INSERT INTO `cards` (`id`, `id_projeto`, `id_etapa`, `id_usuario`, `nome_card`, `solicitacao`, `aprovacao`, `colaboracao`) VALUES
(11, 9, 1, 4, 'frwfgerger', 'rwgrwgdsfsq', 1, 'iurrrrrrrrefgvyie grrrrrrrrrrrfç'),
(12, 9, 2, 4, 'blau blau', 'cwe4frewq', 0, 'Essa é minha colaboração'),
(13, 9, 3, 4, 'cwfvreaw', 'werfqwef', 0, ''),
(14, 9, 4, 4, 'Ceafewfw', 'CWEFCWEWQ', 0, ''),
(15, 9, 2, 4, 'WECFAERCFW', 'EWQFFWER', 1, 'wefwqrfgerw'),
(17, 12, 2, 6, 'card 2', '', 0, ''),
(18, 12, 3, 6, 'card 3', '', 0, ''),
(19, 12, 4, 6, 'Card 4', '', 0, ''),
(20, 13, 1, 6, 'blau blau', 'ergerqgreqgvfsv', 1, 'IGFUGBUIRFB'),
(21, 13, 2, 6, 'CARD 2', 'ESSE É O CARD 2\r\n', 1, ''),
(22, 13, 3, 6, 'CARD 3', 'ESSE É O CARD 3\r\n', 0, ''),
(23, 13, 4, 6, 'CARD 4', 'ESSE É O CARD 4', 0, ''),
(25, 12, 1, 6, 'rwgfreqgre', 'vrewgvree', 0, ''),
(27, 11, 1, 6, '', '', 0, ''),
(28, 11, 2, 6, '', '', 0, ''),
(29, 11, 3, 6, '', '', 0, ''),
(30, 11, 4, 6, '', '', 0, ''),
(31, 14, 1, 7, 'Sobre a empresa', 'asdasaasd ', 1, 'sasdasdasdas'),
(32, 14, 2, 7, 'asdasd', ' a', 2, 'adasdasdasd '),
(33, 14, 3, 7, 'aaaaaaaaaaaaaa', 'a', 1, 'sdasdasdasdasdasd'),
(34, 14, 4, 7, '123123123', 'a', 1, 'dasdasdas'),
(35, 14, 4, 7, 'asdasdasd', 'asdasdasd', 1, ''),
(36, 20, 1, 7, 'Tarefa Tal', 'Descrição da tarefa\r\n', 0, 'Colaboração Feita'),
(37, 20, 2, 7, 'TAREFINHA', 'AAAAAAA', 0, ''),
(38, 20, 3, 7, 'TAREFONA', 'ASDADAS ASD', 0, 'ASDASDASDASD'),
(39, 14, 1, 7, 'Tarefa 02', 'asd aiushdasidha isudh', 1, 'asdasdasdasdas'),
(66, 14, 3, 8, 'asdasdasd', 'aaa', 2, 'asdasasdasd'),
(67, 14, 3, 8, 'asdasdadasdas', 'a', 1, ''),
(68, 14, 2, 7, '11111', 'aaa', 1, ''),
(69, 17, 1, 7, 'aa', 'a', 0, ''),
(70, 14, 2, 7, 'tattatatata', 't', 1, ''),
(71, 27, 1, 10, 'Tarefa 01 - MCS', 'Solicitação do card aqui', 1, ''),
(72, 27, 1, 10, 'Tarefa 02', 'asdasdsad', 1, ''),
(73, 27, 2, 10, 'Tarefa 03', 'asdadasdasd', 1, ''),
(74, 27, 2, 10, 'asd', 's', 1, ''),
(75, 27, 1, 10, 'asdasdasd', 'as', 1, ''),
(76, 27, 5, 10, '2 asdasdasdasdas', 'a', 1, ''),
(77, 27, 5, 10, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'a', 0, ''),
(78, 27, 6, 10, 'asdasdasda', 'asd', 0, ''),
(79, 27, 6, 10, 'asdasdasda', 'asd', 1, ''),
(80, 27, 10, 10, 'asdasda', 'asd', 0, ''),
(81, 27, 15, 10, 'asdadasd', 'aa', 1, ''),
(82, 27, 15, 10, 'asdasdasd', 'asdasd', 1, ''),
(83, 27, 3, 10, 'asdasdasd', 'asdasd', 1, ''),
(84, 27, 13, 10, 'asdasdasd', 'asdasd', 1, ''),
(85, 28, 1, 11, 'Tarefa 02', 'asd', 1, ''),
(86, 28, 1, 11, 'asdadasd', 'asd', 1, ''),
(87, 28, 2, 11, 'asdasdasdas', 'asd', 1, ''),
(88, 28, 9, 11, 'asdasd', 'a', 0, ''),
(89, 28, 10, 11, 'asdasdas', 'asdasd', 0, ''),
(90, 28, 11, 11, 'asdasdasd', 'asd', 1, ''),
(91, 28, 3, 11, 'asdasdas', 'asd', 1, ''),
(92, 28, 3, 11, 'asdasd', 'as', 0, ''),
(93, 29, 2, 11, 'asdasdasd', 'asdasd', 1, ''),
(94, 29, 3, 11, 'asdasdasd', 'asd', 1, ''),
(95, 29, 4, 11, 'asdasdasas', 'asd', 1, ''),
(96, 29, 1, 11, 'asdasdasd', 'asdasd', 1, ''),
(97, 29, 2, 11, 'asdasdas', 'dasdasd', 2, 'asdasd'),
(98, 29, 6, 11, 'asdasdasd', 'asd', 0, ''),
(99, 29, 14, 11, 'asdasdasdasd', 'assad', 1, ''),
(100, 29, 15, 11, 'asdasdasdaas', 'dasdasd', 1, '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_card` int(11) NOT NULL,
  `id_projeto` int(11) NOT NULL,
  `comentario` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_usuario`, `id_card`, `id_projeto`, `comentario`) VALUES
(4, 2, 22, 13, 'dkshfvbyri fuiwrfge'),
(5, 2, 20, 13, 'rgeui eirrr ierughier'),
(6, 2, 20, 13, 'lertbgr geodfusavfodjn'),
(7, 6, 20, 13, 'ioufgryiwfgvq iwrfgbewq'),
(8, 7, 33, 14, 'Eita'),
(9, 7, 33, 14, 'eita dnv'),
(10, 8, 33, 14, 'asdasdadasdasd'),
(11, 7, 36, 20, 'Comentário hahaa'),
(12, 7, 39, 14, 'asdasda asd asdasd'),
(13, 8, 39, 14, 'asdasd'),
(14, 7, 32, 14, 'adadasdasd'),
(15, 7, 32, 14, 'aasdasdasdasd'),
(16, 7, 69, 17, 'aaaaaa'),
(17, 7, 32, 14, ''),
(18, 10, 73, 27, 'asdasdasd');

-- --------------------------------------------------------

--
-- Estrutura para tabela `etapas`
--

CREATE TABLE `etapas` (
  `id` int(11) NOT NULL,
  `nome` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `etapas`
--

INSERT INTO `etapas` (`id`, `nome`) VALUES
(1, 'Briefing'),
(2, 'Pesquisa'),
(3, 'Análise'),
(4, 'Plataforma de marca'),
(5, 'Mapeamento'),
(6, 'DNA de Marca'),
(7, 'Universo visual'),
(8, 'Universo verbal'),
(9, 'Logotipo'),
(10, 'Expressão'),
(11, 'Experiência'),
(12, 'Relacionamento'),
(13, 'Logo Pack'),
(14, 'Impressos'),
(15, 'Digitais'),
(16, 'Documentação');

-- --------------------------------------------------------

--
-- Estrutura para tabela `projetos`
--

CREATE TABLE `projetos` (
  `id` int(10) NOT NULL,
  `cliente_responsavel` varchar(200) NOT NULL,
  `data_ini` date NOT NULL,
  `data_fim` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `id_usuario` int(10) NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL,
  `tipo_projeto` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `projetos`
--

INSERT INTO `projetos` (`id`, `cliente_responsavel`, `data_ini`, `data_fim`, `status`, `nome`, `descricao`, `id_usuario`, `createdAt`, `updatedAt`, `tipo_projeto`) VALUES
(7, 'Testando mais um projeto', '2024-06-19', '2024-06-21', 0, 'herculano teste beta', 'Bom bonito e bacana ', 4, '', '', 'LOGOTIPO'),
(8, 'Mais um projeto lider', '2024-06-19', '2024-06-22', 0, 'lider', 'Bom bonito e bacana ', 4, '', '', 'LOGOTIPO'),
(9, 'Teste de lucas ', '2024-06-20', '2024-06-21', 1, 'lucas dknnn', 'Bom bonito e bacana ', 3, '', '', 'LOGOTIPO'),
(10, 'Betão multi midia', '2024-06-21', '2024-06-28', 0, 'breu do breu', 'Bom bonito e bacana ', 5, '', '', 'LOGOTIPO'),
(11, 'blau blau blau', '2024-06-21', '2024-06-07', 0, 'blau', 'Bom bonito e bacana ', 6, '', '', ''),
(12, 'Thiago', '2024-06-21', '2024-06-21', 0, 'Herculano testando', 'Bom bonito e bacana ', 6, '', '', 'LOGOTIPO'),
(13, 'testando 2', '2024-06-21', '2024-06-21', 0, 'joao carv', 'Bom bonito e bacana ', 6, '', '', 'LOGOTIPO'),
(14, 'Testando jose', '2024-06-07', '2024-06-29', 0, 'Fabs', '1321231', 7, '', '', 'LOGOTIPO'),
(15, 'Cesar', '2024-06-14', '2024-06-25', 0, 'acacaa', 'asdasdsa', 8, '', '', 'LOGOTIPO'),
(16, 'Projeto 02', '2024-06-08', '2024-06-18', 0, 'HTML', 'sei lá', 7, '', '', 'Branding'),
(17, 'MARIA', '2024-06-30', '2024-07-06', 0, 'MAMAMA', '1321231', 7, '', '', 'asdasd'),
(18, 'Isaura', '2024-06-23', '2024-06-26', 0, 'isaurettes', 'Nossa', 8, '', '', 'asdasd'),
(19, 'MARIA', '2024-06-28', '2024-06-29', 0, 'sabrina', 'adasd', 7, '', '', 'LOGOTIPO'),
(20, 'PROJETO NOVO', '2024-06-26', '2024-06-29', 0, 'Thiago', 'ASDASDASDA', 7, '', '', 'LOGOTIPO'),
(21, 'PRojeto 000000', '2024-06-21', '2024-06-29', 0, 'asdasd', 'asdasdasd', 7, '', '', 'asdasdasd'),
(22, 'Isaura', '2024-06-25', '2024-06-27', 0, 'Povoada', 'Novo projeto de marca para a povoada', 7, '', '', 'Rebranding'),
(23, 'Thiago', '2024-06-08', '2024-06-01', 0, 'a', 'sei lá', 7, '', '', 'aaa'),
(24, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2024-06-15', '2024-06-29', 0, 'a', 'a', 8, '', '', 'a'),
(25, 'jose', '2024-06-27', '2024-06-29', 0, 'MARCA TAL', 'ASDASDASD', 7, '', '', 'ASD'),
(26, 'Maria Clara', '2024-06-28', '2024-06-29', 0, 'sabrina', 'asdasdasd', 7, '', '', 'asdasd'),
(27, 'Maria Clara', '2024-06-28', '2024-06-28', 0, 'MC SALGADOS', 'asdasd', 10, '', '', 'LOGOTIPO'),
(28, 'TROMBADINHA', '2024-06-28', '2024-06-29', 0, 'MARCA DO TROMBADINHA', 'Descrição teste', 11, '', '', 'Rebranding'),
(29, 'João Pedro', '2024-06-29', '2024-06-30', 0, 'yyyyyyyyyyyyyyyyyyyyyyy', 'asdasd', 11, '', '', 'asdasd');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefone` varchar(200) NOT NULL,
  `profissao` varchar(200) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `createdAt` varchar(200) NOT NULL,
  `updatedAt` varchar(200) NOT NULL,
  `avatar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `email`, `telefone`, `profissao`, `nome`, `senha`, `createdAt`, `updatedAt`, `avatar`) VALUES
(1, 'jose@email.com.br', '6541984984', 'vender', 'jose', '123456', '', '', 1),
(2, 'jose@teste2.com', '(88)911111111', 'mototaxi', 'Testando jose', '123456', '', '', 2),
(3, 'lucas@email.com', '(43) 3087-6199', 'vender browniw', 'Lucas', '123456', '', '', 3),
(4, 'franciscoherculano@email.com', '(65) 3862-7361', 'Programador', 'Francisco Herculano', '123456', '', '', 1),
(5, 'maria.clara.advogada@email.com', '(11) 98765-4321', 'Advogada', 'Maria Clara', '123456', '', '', 3),
(6, 'joao.pedro.engcivil@email.com', '(21) 98765-1234', 'Engenheiro Civil', 'João Pedro', '654321', '', '', 2),
(7, 'thiagoalvesdg@gmail.com', '88981219267', 'Designer', 'Thiago', '123456', '', '', 1),
(8, 'herculano@herculano.com', '88997991873', 'Back End', 'Herculano', '123456', '', '', 3),
(9, 'thiagoalvesdg@gmail.com', '', '', '', '123456', '', '', 1),
(10, 'tromba@tromba.com', '88997991873', 'batedor', 'TROMBADINHA', '123456', '', '', 4),
(11, 'julian@julian.com', '88997991873', 'Designer gráfico', 'Julian', '123456', '', '', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_do_projeto`
--

CREATE TABLE `usuario_do_projeto` (
  `id` int(20) NOT NULL,
  `id_usuario` int(20) NOT NULL,
  `id_projeto` int(20) NOT NULL,
  `tipo_usuario` int(20) NOT NULL,
  `pode_colaborar` tinyint(1) NOT NULL,
  `pode_editar` tinyint(1) NOT NULL,
  `createdAt` varchar(200) NOT NULL,
  `updatedAt` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario_do_projeto`
--

INSERT INTO `usuario_do_projeto` (`id`, `id_usuario`, `id_projeto`, `tipo_usuario`, `pode_colaborar`, `pode_editar`, `createdAt`, `updatedAt`) VALUES
(11, 4, 7, 1, 1, 1, '', ''),
(12, 4, 8, 1, 1, 1, '', ''),
(13, 3, 9, 1, 1, 1, '', ''),
(14, 4, 9, 3, 1, 1, '', ''),
(15, 5, 10, 1, 1, 1, '', ''),
(16, 2, 10, 0, 1, 0, '', ''),
(17, 6, 11, 1, 1, 1, '', ''),
(18, 2, 11, 3, 0, 0, '', ''),
(19, 6, 12, 1, 1, 1, '', ''),
(20, 5, 12, 2, 1, 1, '', ''),
(21, 6, 13, 1, 1, 1, '', ''),
(22, 2, 13, 2, 1, 0, '', ''),
(23, 4, 13, 0, 1, 1, '', ''),
(24, 7, 14, 1, 1, 1, '', ''),
(26, 8, 15, 1, 1, 1, '', ''),
(27, 7, 16, 1, 1, 1, '', ''),
(28, 7, 17, 1, 1, 1, '', ''),
(29, 1, 16, 2, 0, 0, '', ''),
(30, 8, 18, 1, 1, 1, '', ''),
(31, 7, 9, 2, 1, 1, '', ''),
(32, 7, 19, 1, 1, 1, '', ''),
(33, 3, 19, 2, 0, 0, '', ''),
(34, 7, 20, 1, 1, 1, '', ''),
(35, 2, 20, 2, 1, 1, '', ''),
(36, 7, 21, 1, 1, 1, '', ''),
(37, 5, 21, 2, 1, 1, '', ''),
(38, 4, 14, 1, 1, 1, '', ''),
(39, 7, 22, 1, 1, 1, '', ''),
(40, 1, 22, 2, 1, 0, '', ''),
(41, 5, 14, 2, 0, 0, '', ''),
(42, 2, 14, 3, 1, 1, '', ''),
(43, 6, 22, 2, 1, 1, '', ''),
(44, 5, 17, 0, 0, 0, '', ''),
(48, 1, 17, 0, 0, 0, '', ''),
(49, 2, 17, 2, 1, 0, '', ''),
(50, 9, 22, 1, 1, 1, '', ''),
(51, 7, 23, 1, 1, 1, '', ''),
(52, 4, 23, 4, 0, 0, '', ''),
(53, 8, 24, 1, 1, 1, '', ''),
(54, 7, 24, 4, 0, 0, '', ''),
(55, 7, 25, 1, 1, 1, '', ''),
(56, 1, 25, 3, 0, 0, '', ''),
(57, 7, 26, 1, 1, 1, '', ''),
(58, 5, 26, 3, 0, 0, '', ''),
(60, 10, 27, 1, 1, 1, '', ''),
(61, 5, 27, 3, 0, 0, '', ''),
(62, 2, 27, 2, 1, 0, '', ''),
(63, 2, 27, 2, 1, 0, '', ''),
(64, 11, 28, 1, 1, 1, '', ''),
(67, 10, 28, 3, 0, 0, '', ''),
(69, 11, 29, 1, 1, 1, '', ''),
(70, 6, 29, 3, 0, 0, '', '');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_etapa` (`id_etapa`),
  ADD KEY `id_projeto` (`id_projeto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_card` (`id_card`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_projeto` (`id_projeto`);

--
-- Índices de tabela `etapas`
--
ALTER TABLE `etapas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `projetos`
--
ALTER TABLE `projetos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projetos_ibfk_1` (`id_usuario`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuario_do_projeto`
--
ALTER TABLE `usuario_do_projeto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_projeto` (`id_projeto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `etapas`
--
ALTER TABLE `etapas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `projetos`
--
ALTER TABLE `projetos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `usuario_do_projeto`
--
ALTER TABLE `usuario_do_projeto`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`id_etapa`) REFERENCES `etapas` (`id`),
  ADD CONSTRAINT `cards_ibfk_2` FOREIGN KEY (`id_projeto`) REFERENCES `projetos` (`id`),
  ADD CONSTRAINT `cards_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`);

--
-- Restrições para tabelas `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_card`) REFERENCES `cards` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_3` FOREIGN KEY (`id_projeto`) REFERENCES `projetos` (`id`);

--
-- Restrições para tabelas `projetos`
--
ALTER TABLE `projetos`
  ADD CONSTRAINT `projetos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `usuario_do_projeto`
--
ALTER TABLE `usuario_do_projeto`
  ADD CONSTRAINT `usuario_do_projeto_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projetos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usuario_do_projeto_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
