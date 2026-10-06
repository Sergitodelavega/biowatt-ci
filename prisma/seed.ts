import { PrismaClient, Role, AccountStatus, DataQualityStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demonstration database...');

  const defaultPasswordHash = await bcrypt.hash('DemoBiowatt2026!', 10);

  // 1. Create Organizations
  const adminOrg = await prisma.organization.create({
    data: {
      name: 'BIOWATT-CI Administration',
      type: 'GOVERNMENT',
      territory: 'Côte d\'Ivoire (National)',
      description: 'Unité centrale de gouvernance et régulation de la plateforme BIOWATT-CI',
    },
  });

  const stateOrg = await prisma.organization.create({
    data: {
      name: 'Ministère de l\'Environnement et du Développement Durable',
      type: 'MINISTRY',
      territory: 'National',
      description: 'Supervision et planification stratégique des énergies renouvelables',
    },
  });

  const collectivityOrg = await prisma.organization.create({
    data: {
      name: 'District Autonome de San-Pédro',
      type: 'COLLECTIVITY',
      territory: 'San-Pédro',
      description: 'Collectivité territoriale partenaire du développement de la méthanisation local',
    },
  });

  const ownerOrg = await prisma.organization.create({
    data: {
      name: 'Coopérative Palmier & Huilerie du Bas-Sassandra',
      type: 'COOPERATIVE',
      territory: 'San-Pédro',
      description: 'Détenteur de gisements issus de la transformation de palmier à huile',
    },
  });

  const operatorOrg = await prisma.organization.create({
    data: {
      name: 'Ivoire Biogaz Énergie S.A.',
      type: 'PRIVATE_COMPANY',
      territory: 'Abidjan / San-Pédro',
      description: 'Opérateur industriel de valorisation du biogaz',
    },
  });

  // 2. Create Demonstration Users
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@biowatt.ci',
        passwordHash: defaultPasswordHash,
        firstName: 'Konan',
        lastName: 'Kouassi',
        role: Role.ADMIN_BIOWATT,
        status: AccountStatus.ACTIVE,
        organizationId: adminOrg.id,
      },
      {
        email: 'etat@environnement.gouv.ci',
        passwordHash: defaultPasswordHash,
        firstName: 'Aminata',
        lastName: 'Touré',
        role: Role.STATE,
        status: AccountStatus.ACTIVE,
        organizationId: stateOrg.id,
      },
      {
        email: 'mairie@sanpedro.ci',
        passwordHash: defaultPasswordHash,
        firstName: 'Yao',
        lastName: 'Brou',
        role: Role.COLLECTIVITY,
        status: AccountStatus.ACTIVE,
        organizationId: collectivityOrg.id,
      },
      {
        email: 'detenteur@palm-ci.co',
        passwordHash: defaultPasswordHash,
        firstName: 'Gnamien',
        lastName: 'Kouadjo',
        role: Role.FEEDSTOCK_OWNER,
        status: AccountStatus.ACTIVE,
        organizationId: ownerOrg.id,
      },
      {
        email: 'operateur@biogaz.ci',
        passwordHash: defaultPasswordHash,
        firstName: 'Marc',
        lastName: 'Diallo',
        role: Role.BIOGAS_OPERATOR,
        status: AccountStatus.ACTIVE,
        organizationId: operatorOrg.id,
      },
      {
        email: 'attente@societe.ci',
        passwordHash: defaultPasswordHash,
        firstName: 'Adama',
        lastName: 'Traoré',
        role: Role.FEEDSTOCK_OWNER,
        status: AccountStatus.PENDING,
        justification: 'Demande de création de compte pour nouvel abattoir municipal',
      },
    ],
  });

  // 3. Create Data Sources
  const demoSource = await prisma.dataSource.create({
    data: {
      name: 'Donnée de Démonstration BIOWATT-CI',
      type: 'SURVEY',
      reliabilityScore: 0.8,
    },
  });

  // 4. Create Sample Feedstock Sites (Marked explicitly DEMONSTRATION)
  await prisma.feedstockSite.create({
    data: {
      name: 'Gisement Rafles & Effluents Huilerie San-Pédro [DÉMO]',
      ownerOrganizationId: ownerOrg.id,
      sector: 'huilerie',
      substrateType: 'rafles de palme & effluents POME',
      latitude: 4.7521,
      longitude: -6.6342,
      fuzzyLatitude: 4.75,
      fuzzyLongitude: -6.63,
      totalWasteVolume: 12500,
      fermentableFraction: 85,
      estimatedFermentableVolume: 10625,
      frequency: 'quotidien',
      regularity: 'constante',
      seasonality: 'Toute l\'année (Pointe Mars-Juin)',
      sortingStatus: 'trié à la source',
      contaminationStatus: 'faible',
      pretreatment: 'broyage mécanique',
      dataQualityStatus: DataQualityStatus.DEMONSTRATION,
      sourceId: demoSource.id,
      sharingConsent: true,
      status: 'ACTIVE',
    },
  });

  // 5. Create Sample Biogas Unit (Marked explicitly DEMONSTRATION)
  await prisma.biogasUnit.create({
    data: {
      name: 'Centrale Biogaz San-Pédro 1 [DÉMO]',
      operatorOrganizationId: operatorOrg.id,
      latitude: 4.7610,
      longitude: -6.6210,
      fuzzyLatitude: 4.76,
      fuzzyLongitude: -6.62,
      technology: 'CSTR Continu (Digesteur Industriel)',
      commissioningYear: 2023,
      operationalStatus: 'opérationnelle',
      dailySubstrateNeed: 35,
      capacity: 50,
      acceptedSubstrates: JSON.stringify(['rafles de palme', 'effluents POME', 'déchets de marché']),
      declaredProduction: 450000,
      productionReliability: 'Déclaré par exploitant',
      dataQualityStatus: DataQualityStatus.DEMONSTRATION,
      sourceId: demoSource.id,
      protectedContactEmail: 'contact-prive@biogaz.ci',
      protectedContactPhone: '+225 07 00 00 11 22',
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
