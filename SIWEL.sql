-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : sam. 08 jan. 2022 à 04:14
-- Version du serveur :  10.3.29-MariaDB
-- Version de PHP : 7.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `SIWEL`
--

-- --------------------------------------------------------

--
-- Structure de la table `elements`
--

CREATE TABLE `elements` (
  `ID_elements` int(11) NOT NULL,
  `Nom` text NOT NULL,
  `Lettre` tinytext NOT NULL,
  `Celibataire` int(11) NOT NULL,
  `Couple` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `elements`
--

INSERT INTO `elements` (`ID_elements`, `Nom`, `Lettre`, `Celibataire`, `Couple`) VALUES
(1, 'Carbone', 'C', 4, 0),
(2, 'Oxygène', 'O', 2, 2),
(3, 'Hydrogène', 'H', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `fonction_organique`
--

CREATE TABLE `fonction_organique` (
  `ID_fonction` int(11) NOT NULL,
  `Fonction` text NOT NULL,
  `Nom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fonction_organique`
--

INSERT INTO `fonction_organique` (`ID_fonction`, `Fonction`, `Nom`) VALUES
(1, '-COOH', 'Acide carboxylique'),
(2, 'C*OOH', 'Acide carboxylique'),
(3, '-CO-O-CO-', 'Anhydride'),
(4, '-CO-O-C*O', 'Anhydride'),
(5, 'C*O-O-CO-', 'Anhydride'),
(6, 'C*O-O-C*O', 'Anhydride'),
(7, '-CO-O-C***', 'Ester'),
(8, '-CO-OC**-', 'Ester'),
(9, 'C*O-O-C***', 'Ester'),
(10, 'C*O-O-C**-', 'Ester'),
(11, '-CHO', 'Aldéhyde'),
(12, 'C*HO', 'Aldéhyde'),
(13, 'CH*O', 'Aldéhyde'),
(14, '-C**-CO-C***', 'Cétone'),
(15, '-C**-CO-C**-', 'Cétone'),
(16, 'C***-CO-C***', 'Cétone'),
(17, 'C***-CO-C**-', 'Cétone'),
(18, '-C**OH', 'Alcool'),
(19, 'C***OH', 'Alcool'),
(20, 'C***-O-C***', 'Éther'),
(21, '-C**-O-C***', 'Éther'),
(22, 'C***-O-C**-', 'Éther'),
(23, '-C**-O-C**-', 'Éther');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`ID_elements`);

--
-- Index pour la table `fonction_organique`
--
ALTER TABLE `fonction_organique`
  ADD PRIMARY KEY (`ID_fonction`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `elements`
--
ALTER TABLE `elements`
  MODIFY `ID_elements` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `fonction_organique`
--
ALTER TABLE `fonction_organique`
  MODIFY `ID_fonction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
