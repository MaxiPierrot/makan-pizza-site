// Questions fréquentes : source unique pour /faq, les blocs FAQ des pages d'offre
// et le balisage FAQPage. Les réponses vont du fait principal aux précisions.
// Liens dans une réponse : [texte](/page). Le balisage FAQPage garde le texte seul.
// Les questions non publiables (info manquante ou décision en attente) sont dans
// _brouillons/faq-non-publiees.md, jamais ici.
const prix = require("./prix.js");

const sections = [
  {
    id: "formule",
    title: "Choisir sa formule",
    items: [
      { id: "choisir", q: "Atelier pizza ou pizza party : lequel choisir ?", a: `L'atelier convient si vous souhaitez cuisiner vous-même avec vos proches ; la pizza party, si vous préférez profiter de vos invités pendant que je prépare les pizzas. Un atelier accueille idéalement de ${prix.minPersonnes} à ${prix.maxPersonnes} personnes, et jusqu'à ${prix.maxPossible} sur demande, tandis qu'une pizza party peut réunir environ 25 personnes. Si vous hésitez, décrivez-moi votre projet par [formulaire](/contact) et je vous conseillerai.` },
      { id: "difference", q: "Quelle différence entre l'atelier Bases et l'initiation à la pizza napolitaine ?", a: `L'atelier Bases se fait avec le four de votre cuisine (${prix.bases} € par personne), l'initiation avec mon four électrique qui monte jusqu'à 500°C (${prix.initiation} € par personne). Dans les deux cas, nous passons ensemble par toutes les étapes : la pâte, l'étalage, la garniture et la cuisson. Les Bases durent de 2h à 2h30, l'initiation de 2h30 à 3h. Le détail de chaque formule se trouve sur les pages [atelier Bases](/atelier-pizza-lyon) et [initiation](/atelier-pizza-napolitaine-lyon).` },
      { id: "napolitaine", q: "Qu'est-ce qu'une pizza napolitaine ?", a: "C'est une pizza dont la pâte fermente longtemps, environ 24 heures, puis cuit dans un four très chaud pendant environ 90 secondes. Mon four électrique monte jusqu'à 500°C. Pour la mozzarella, j'utilise uniquement de la fior di latte, et je ne fais aucun compromis sur la farine et la tomate. Je reproduis cette cuisson chez vous lors de l'initiation et de la pizza party." },
      { id: "debutant", q: "Peut-on participer en étant débutant ?", a: "Oui. Aucun niveau n'est demandé et personne n'est jugé sur sa pizza, qui sera bonne même si elle n'est pas ronde. Ces ateliers sont une activité de loisir et non une formation professionnelle ; aucun diplôme n'est délivré." },
      { id: "enfants", q: "Peut-on venir en famille, avec des enfants ?", a: "Oui, il n'y a pas d'âge minimum. J'adapte l'atelier pour que chaque enfant puisse s'épanouir. Un adulte reste présent pendant l'atelier, à raison d'environ un adulte pour quatre enfants. Indiquez l'âge des enfants dans votre demande." },
      { id: "anniversaire", q: "Peut-on fêter un anniversaire avec un atelier pizza ou une pizza party à domicile ?", a: `Oui. Jusqu'à ${prix.maxPossible} personnes, je vous propose un atelier où nous faisons les pizzas ensemble, avec le four de la maison (${prix.bases} € par personne) ou avec le mien (${prix.initiation} € par personne). Pour un plus grand nombre d'invités, la [pizza party](/pizza-party-domicile-lyon) convient mieux, car je prépare alors les pizzas sur place. Pour un anniversaire à thème, je peux adapter les recettes.` },
      { id: "evjf-evg", q: "Peut-on organiser un EVJF ou un EVG avec un atelier pizza à domicile ?", a: `Oui. Je viens chez la future mariée ou le futur marié, ou dans le lieu de votre choix, si bien que vous n'avez pas de salle à réserver. Un atelier accueille idéalement de ${prix.minPersonnes} à ${prix.maxPersonnes} personnes, et jusqu'à ${prix.maxPossible} sur demande. Pour un EVJF ou un EVG, je peux aussi associer atelier et pizza party, ingrédients fournis, sur devis. Si vous êtes plus nombreux, écrivez-moi et nous verrons ensemble ce qui est possible.` },
      { id: "mariage-enfants", q: "Pour un mariage, les enfants peuvent-ils faire leur propre pizza ?", a: "Oui, selon le nombre d'enfants. Pendant que les parents profitent de leur repas entre adultes, les enfants préparent leur propre pizza. Un adulte reste avec eux, à raison d'environ un adulte pour quatre enfants. Je ne prépare pas de repas de mariage complet ; je viens uniquement pour cette animation, sur devis." },
      { id: "occasions", q: "Pour quelles occasions venez-vous ?", a: "Je viens pour un anniversaire, un EVJF ou un EVG, un baby shower, ou simplement pour une soirée entre amis. Je peux aussi créer un événement sur mesure, avec des recettes liées à votre thème et un déroulé à votre façon. Racontez-moi ce que vous avez en tête dans votre demande de [devis](/contact?atelier=sur-mesure)." },
      { id: "associations", q: "Faites-vous des événements pour des associations ou des brocantes ?", a: "Oui, sur devis et selon l'événement. L'organisation est plus simple lorsque des bénévoles peuvent aider. Comme je travaille seul, le nombre de pizzas dépend de mon rythme, entre 12 et 18 pizzas par heure. Décrivez-moi votre événement, le nombre de personnes attendu et le lieu dans votre [demande](/contact?atelier=sur-mesure)." },
    ],
  },
  {
    id: "prix",
    title: "Tarifs, zone et déplacement",
    items: [
      { id: "prix-atelier", q: "Combien coûte un atelier pizza à domicile à Lyon ?", a: `L'atelier Bases coûte ${prix.bases} € par personne et l'initiation à la pizza napolitaine ${prix.initiation} € par personne, à partir de ${prix.minPersonnes} personnes. Je me déplace dans toute la région lyonnaise ; selon la distance, des frais de déplacement peuvent s'ajouter. À titre indicatif, pour un groupe de 5 personnes, l'atelier revient à ${prix.bases * 5} € avec les Bases et à ${prix.initiation * 5} € avec l'initiation.` },
      { id: "prix-party", q: "Combien coûte un pizzaiolo à domicile pour une pizza party à Lyon ?", a: `Une pizza party se fait sur devis. Le tarif dépend du nombre d'invités, de la durée, du choix des pizzas et de la distance. Selon la distance, des frais de déplacement peuvent s'ajouter. Je vous envoie le devis après votre [demande](/contact?atelier=pizza-party).` },
      { id: "zone", q: "Où vous déplacez-vous, et le déplacement est-il facturé ?", a: `Je me déplace à Lyon et dans toute la région lyonnaise, chez vous ou dans le lieu de votre choix. Selon la distance, des frais de déplacement peuvent s'ajouter ; je les précise toujours dans le devis, avant toute réservation. Le stationnement payant est facturé au prix réel. Si vous connaissez une place gratuite près du lieu, indiquez-la-moi.` },
      { id: "boissons", q: "Faut-il prévoir les boissons et la vaisselle ?", a: "Je ne m'occupe pas de la vaisselle, qui reste à votre charge. Les boissons peuvent être prévues sur devis, selon l'événement. Précisez vos besoins dans votre demande et je vous dirai ce qui est réalisable." },
    ],
  },
  {
    id: "personnes",
    title: "Nombre de personnes et durée",
    items: [
      { id: "nombre", q: "Combien de personnes pour un atelier pizza ?", a: `Un atelier est facturé à partir de ${prix.minPersonnes} personnes ; il reste possible à 2 ou 3, au tarif de ${prix.minPersonnes} personnes. L'idéal est de ${prix.minPersonnes} à ${prix.maxPersonnes} personnes, et je peux aller jusqu'à ${prix.maxPossible}. Je garde volontairement des groupes réduits : chacun a sa place autour du plan de travail, les échanges restent faciles et je peux m'occuper de chaque participant. Si vous êtes plus nombreux, écrivez-moi et nous verrons ensemble ce qui est possible.` },
      { id: "nombre-party", q: "Combien d'invités et combien de pizzas pour une pizza party ?", a: "Je prépare entre 12 et 18 pizzas par heure, selon les recettes choisies. Seul, je peux servir des pizzas à environ 25 personnes. Il est possible d'aller jusqu'à 40 personnes en ajoutant des focaccias préparées à l'avance, sur devis. Au-delà, je ne peux pas assurer le service seul." },
      { id: "duree", q: "Combien de temps dure un atelier pizza ?", a: "Les Bases durent de 2h à 2h30. L'initiation dure de 2h30 à 3h." },
      { id: "duree-party", q: "Combien de temps dure une pizza party ?", a: "La durée dépend de la configuration sur place et du nombre d'invités. Je vous l'indique dans le devis personnalisé." },
    ],
  },
  {
    id: "materiel",
    title: "Matériel et lieu",
    items: [
      { id: "four", q: "Faut-il un four spécial ?", a: `Pour l'atelier Bases, un four domestique suffit, avec une pierre à pizza si vous en avez une (sinon, comptez environ ${prix.accessoiresBases} € pour la pierre et quelques accessoires). Pour l'initiation et la pizza party, j'apporte mon four.` },
      { id: "interieur", q: "Peut-on faire l'événement à l'intérieur, et s'il pleut ?", a: "Oui. Mon four étant électrique, l'événement peut se tenir à l'intérieur, et la pluie ne pose donc pas de problème. Si le lieu ne convient finalement pas, nous cherchons ensemble une solution pour que chacun passe un bon moment : changement de lieu, de date ou de formule, ou transformation en atelier si le lieu le permet. Plus vous me prévenez tôt, plus il reste de solutions sans frais." },
      { id: "ingredients", q: "Les ingrédients sont-ils fournis ?", a: "Pour les ateliers, les ingrédients prévus sont ceux de la pizza margherita. Si vous souhaitez d'autres garnitures, vous les achetez de votre côté et je vous conseille pour les choisir. Pour la pizza party, je m'occupe de tout." },
      { id: "choix-pizzas", q: "Peut-on choisir les pizzas d'une pizza party ?", a: "Oui. Nous les choisissons ensemble dans la [carte](/carte), qui propose des classiques et des créations plus originales. Les quantités dépendent du nombre d'invités. Le choix des pizzas influe sur le tarif. Pour un anniversaire ou une soirée à thème, je peux adapter les recettes." },
      { id: "menu-complet", q: "Faites-vous un menu complet avec entrée et dessert ?", a: "Je prépare principalement des pizzas. Je peux ajouter des focaccias avec des dips, préparées à l'avance, pour varier les plaisirs ou pour l'apéritif. Je ne fais pas de menu complet avec entrée et dessert." },
      { id: "camion", q: "Venez-vous avec un camion ?", a: "Non, je viens avec mon four électrique et mon matériel, sans camion. Le nombre de pizzas dépend de mon rythme, entre 12 et 18 pizzas par heure, selon les recettes." },
    ],
  },
  {
    id: "jour-j",
    title: "Le jour J, allergies et régimes",
    items: [
      { id: "deroule-atelier", q: "Comment se déroule un atelier pizza à domicile ?", a: "J'arrive chez vous avec le matériel. Nous travaillons la pâte à la main et boulons les pâtons, puis chacun étale et garnit sa pizza. Après la cuisson, nous partageons ensemble les pizzas que nous venons de préparer. Les Bases durent de 2h à 2h30, l'initiation de 2h30 à 3h." },
      { id: "deroule-party", q: "Comment se déroule une pizza party avec un pizzaiolo à domicile ?", a: "J'arrive avec mon four et je prépare les pizzas sur place. Vous profitez de vos invités pendant que les pizzas sortent du four au fil de la soirée. Je m'occupe des ingrédients et de la pâte. L'heure d'arrivée et l'installation dépendent du lieu ; je vous les précise dans le devis." },
      { id: "cuisine", q: "Laissez-vous la cuisine propre ?", a: "Avant de partir, je range et je nettoie rapidement ce que j'ai utilisé. Je ne fais pas le ménage de la pièce." },
      { id: "allergies", q: "Comment faire en cas d'allergie ou de régime particulier ?", a: "Signalez-le-moi dès votre demande afin que j'en tienne compte dans le devis. En cas d'allergie sévère, parlons-en avant la réservation." },
      { id: "vegetarien-gluten", q: "Faites-vous des pizzas végétariennes ou sans gluten ?", a: "Plusieurs pizzas de la [carte](/carte) sont sans viande, comme la Margherita, les 3 Fromages, les 4 Fromages ou la Chèvre-miel. Une pizza sans gluten est possible selon les demandes. Comme elle demande plus de préparation, elle entraîne un supplément. Je la prépare et la cuis en premier, à part des autres pizzas. Précisez-le dès votre demande." },
    ],
  },
  {
    id: "reserver",
    title: "Réserver, payer et annuler",
    items: [
      { id: "delai", q: "Combien de temps à l'avance faut-il réserver ?", a: "Le délai dépend de la demande et de mon planning ; il vaut donc mieux réserver le plus tôt possible. Une demande urgente peut être acceptée jusqu'à une semaine avant la date, selon mes disponibilités. Écrivez-moi en précisant la date, le nombre de personnes et l'occasion." },
      { id: "reservation", q: "Comment réserver et comment payer ?", a: "Contactez-moi par [formulaire](/contact) ou par téléphone, et je vous répondrai avec un devis. Un acompte de 30 % confirme la date ; je vous indique comment le régler. Le solde se règle le jour de la prestation, en espèces ou par virement. Wero et Revolut sont aussi acceptés sur place. Je n'accepte pas les chèques." },
      { id: "cadeau", q: "Peut-on offrir un atelier pizza ?", a: `Oui. Vous choisissez l'atelier et le nombre de personnes, vous réglez par virement, et je vous envoie un bon cadeau en PDF, à imprimer ou à transférer. Le bon est valable ${prix.bonValiditeMois} mois, et la date se fixe ensuite avec la personne qui le reçoit. ${prix.noel ? `Jusqu'au ${prix.noelDateLimite}, une pierre à pizza est offerte à l'hôte de l'atelier Bases, et l'initiation bénéficie d'une remise de ${prix.noelRemiseInitiation} %. ` : ""}Tout est expliqué sur la page [Offrir un atelier](/bon-cadeau).` },
      { id: "annulation", q: "Que se passe-t-il si je dois annuler ?", a: "Un imprévu peut arriver, et je cherche toujours une solution avec vous. Plus de 14 jours avant la date, l'annulation est sans frais et l'acompte vous est rendu. Entre 14 et 7 jours, vous pouvez reporter une fois ; si vous annulez, l'acompte reste acquis. Entre 7 jours et 72 heures, 50 % du montant est dû. Moins de 72 heures avant, ou en cas d'absence, la totalité est due. Ces dernières échéances sont plus strictes parce que j'achète les ingrédients et prépare la pâte quelques jours avant. Le nombre de participants peut être réduit sans frais jusqu'à 7 jours avant, dans la limite de 4 personnes pour un atelier. Le détail figure dans les [conditions générales](/cgv)." },
      { id: "annulation-pierre", q: "Et si c'est vous qui devez annuler ?", a: "En cas de maladie ou d'imprévu de ma part, je vous propose une autre date ou je rembourse l'intégralité des sommes versées." },
      { id: "lieu-impossible", q: "Et si le lieu ne convient finalement pas ?", a: "Nous cherchons ensemble une solution. Plus de 7 jours avant, vous pouvez changer le lieu, la date ou la formule sans frais. Entre 7 jours et 72 heures, je peux transformer la pizza party en atelier si le groupe et le lieu s'y prêtent, ou nous reportons une fois. Les ingrédients déjà achetés sont alors facturés au prix coûtant et je vous remets les pâtons. Moins de 72 heures avant, les mêmes possibilités s'offrent à vous, mais les ingrédients et la pâte sont facturés. La pluie n'est jamais un motif d'annulation, puisque l'événement peut se tenir à l'intérieur. Le détail figure dans les [conditions générales](/cgv)." },
    ],
  },
];

const items = sections.flatMap((s) => s.items);

module.exports = {
  sections,
  items,
  pick: (ids) => ids.map((id) => items.find((i) => i.id === id)).filter(Boolean),
};
