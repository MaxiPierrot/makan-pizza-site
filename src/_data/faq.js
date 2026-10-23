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
      { id: "choisir", q: "Atelier pizza ou pizza party : lequel choisir ?", a: `Choisissez l'atelier si vous voulez mettre les mains dans la pâte, et la pizza party si vous préférez rester avec vos invités pendant que je prépare les pizzas. Un atelier accueille de ${prix.minPersonnes} à ${prix.maxPersonnes} personnes, une pizza party jusqu'à environ 25 personnes. Vous hésitez ? Décrivez-moi votre projet par le [formulaire](/contact), je vous conseille.` },
      { id: "difference", q: "Quelle différence entre l'atelier Bases et l'initiation à la pizza napolitaine ?", a: `L'atelier Bases se fait avec le four de votre cuisine (${prix.bases} € par personne), l'initiation avec mon four électrique qui monte jusqu'à 500°C (${prix.initiation} € par personne). Dans les deux cas, on fait la pâte, l'étalage, la garniture et la cuisson ensemble. Les Bases durent de 2h à 2h30, l'initiation de 2h30 à 3h. Détails : [atelier Bases](/atelier-pizza-lyon) et [initiation](/atelier-pizza-napolitaine-lyon).` },
      { id: "napolitaine", q: "Une pizza napolitaine, c'est quoi exactement ?", a: "C'est une pâte qui a fermenté longtemps, environ 24 heures, cuite dans un four très chaud pendant environ 90 secondes. Mon four électrique monte jusqu'à 500°C. Pour la mozzarella, j'utilise uniquement du fior di latte, et sur la farine et la tomate, je ne fais aucun compromis. Je refais ça chez vous, pour l'initiation et la pizza party." },
      { id: "debutant", q: "Je suis débutant, est-ce que ça va ?", a: "Oui. Aucun niveau n'est demandé, et personne n'est jugé sur sa pizza. Si elle n'est pas ronde, elle sera bonne quand même. Ce sont des ateliers pour le plaisir, pas une formation professionnelle : aucun diplôme n'est délivré." },
      { id: "enfants", q: "Peut-on venir en famille, avec des enfants ?", a: "Oui, il n'y a pas d'âge minimum. J'adapte l'atelier pour que chaque enfant puisse s'épanouir. Un adulte reste présent pendant l'atelier, environ un adulte pour quatre enfants. Indiquez l'âge des enfants dans votre demande." },
      { id: "anniversaire", q: "Peut-on fêter un anniversaire avec un atelier pizza ou une pizza party à domicile ?", a: `Oui. Jusqu'à ${prix.maxPersonnes} personnes, un atelier : on fait les pizzas ensemble, avec le four de la maison (${prix.bases} € par personne) ou avec mon four (${prix.initiation} € par personne). Pour plus d'invités, la [pizza party](/pizza-party-domicile-lyon) : je prépare les pizzas sur place. Pour un anniversaire à thème, je peux adapter les recettes.` },
      { id: "evjf-evg", q: "Un EVJF ou un EVG avec un atelier pizza à domicile, c'est possible ?", a: `Oui. Je viens chez la future mariée ou le futur marié, ou dans le lieu que vous avez choisi, donc sans salle à réserver. Un atelier accueille de ${prix.minPersonnes} à ${prix.maxPersonnes} personnes. Pour un EVJF ou un EVG, je peux aussi mêler atelier et pizza party, avec les ingrédients fournis, sur devis. Vous êtes plus nombreux ? Écrivez-moi, on regarde.` },
      { id: "mariage-enfants", q: "Pour un mariage, les enfants peuvent-ils faire leur propre pizza ?", a: "Oui. Pendant que les parents profitent de leur repas entre adultes, les enfants peuvent faire leur propre pizza, selon leur nombre. Un adulte reste présent avec eux, environ un pour quatre enfants. Je ne prépare pas un repas de mariage complet : je viens pour cette animation, sur devis." },
      { id: "occasions", q: "Pour quelles occasions venez-vous ?", a: "Pour un anniversaire, un EVJF ou un EVG, un baby shower, ou simplement une soirée entre amis. Je peux aussi créer un événement sur mesure : des recettes liées à votre thème, un déroulé à votre façon. Racontez-moi ce que vous avez en tête dans votre demande de [devis](/contact?atelier=sur-mesure)." },
      { id: "associations", q: "Faites-vous des événements pour des associations ou des brocantes ?", a: "Oui, sur devis, selon l'événement. C'est plus simple quand des bénévoles peuvent aider. Je travaille seul, donc le nombre de pizzas dépend de mon rythme, entre 12 et 18 pizzas par heure. Décrivez-moi votre événement, le nombre de personnes attendu et le lieu dans votre [demande](/contact?atelier=sur-mesure)." },
    ],
  },
  {
    id: "prix",
    title: "Prix, zone et déplacement",
    items: [
      { id: "prix-atelier", q: "Combien coûte un atelier pizza à domicile à Lyon ?", a: `L'atelier Bases coûte ${prix.bases} € par personne et l'initiation à la pizza napolitaine ${prix.initiation} € par personne, à partir de ${prix.minPersonnes} personnes. Le déplacement est inclus dans un rayon de ${prix.rayonKm} km. Pour un groupe de 5 personnes, cela fait ${prix.bases * 5} € avec les Bases et ${prix.initiation * 5} € avec l'initiation.` },
      { id: "prix-party", q: "Combien coûte un pizzaiolo à domicile pour une pizza party à Lyon ?", a: `Une pizza party se fait sur devis, à partir de ${prix.partyMin} €. Le prix dépend du nombre d'invités, de la durée, du choix des pizzas et de la distance. Dans un rayon de ${prix.rayonKm} km, le déplacement est inclus. Je vous envoie le devis après votre [demande](/contact?atelier=pizza-party).` },
      { id: "zone", q: "Où venez-vous, et le déplacement coûte-t-il quelque chose ?", a: `Je viens à Lyon et dans un rayon de ${prix.rayonKm} km autour de Lyon 9e. Dans cette zone, le déplacement est inclus. Au-delà, un complément peut s'appliquer, je le précise dans le devis. Je facture le stationnement payant au prix réel : si vous connaissez une place gratuite près du lieu, indiquez-la-moi.` },
      { id: "boissons", q: "Faut-il prévoir les boissons et la vaisselle ?", a: "Je ne gère pas la vaisselle, elle reste de votre côté. Pour les boissons, c'est possible sur devis, selon l'événement. Dites-moi ce dont vous avez besoin dans votre demande, et je vous dis ce qui est réaliste." },
    ],
  },
  {
    id: "personnes",
    title: "Nombre de personnes et durée",
    items: [
      { id: "nombre", q: "Combien de personnes pour un atelier pizza ?", a: `De ${prix.minPersonnes} à ${prix.maxPersonnes} personnes. Je garde les groupes petits exprès : chacun a sa place autour du plan de travail, on discute et on rigole, et je peux m'occuper de tout le monde. Vous êtes plus nombreux ? Écrivez-moi, on regarde ce qui est possible.` },
      { id: "nombre-party", q: "Combien d'invités et combien de pizzas pour une pizza party ?", a: "Je prépare entre 12 et 18 pizzas par heure, selon les recettes choisies. Seul, je peux servir des pizzas à environ 25 personnes. Jusqu'à 40 personnes, c'est possible en ajoutant des focaccias préparées à l'avance, sur devis. Au-delà, je ne pourrai pas vous servir seul." },
      { id: "duree", q: "Combien de temps dure un atelier pizza ?", a: "Les Bases durent de 2h à 2h30. L'initiation dure de 2h30 à 3h." },
      { id: "duree-party", q: "Combien de temps dure une pizza party ?", a: "Cela dépend de la configuration sur place et du nombre d'invités. Je vous indique la durée dans le devis personnalisé." },
    ],
  },
  {
    id: "materiel",
    title: "Matériel et lieu",
    items: [
      { id: "four", q: "Faut-il un four spécial ?", a: `Pour l'atelier Bases, un four domestique suffit, avec une pierre à pizza si vous en avez une (sinon, comptez environ ${prix.accessoiresBases} € pour la pierre et quelques accessoires). Pour l'initiation et la pizza party, j'apporte mon four.` },
      { id: "interieur", q: "Peut-on faire l'événement à l'intérieur, et s'il pleut ?", a: "La pluie n'empêche pas de s'amuser : mon four est électrique, l'événement peut se faire à l'intérieur. Si le lieu ne convient finalement pas, on s'adapte ensemble pour que chacun passe un bon moment : changement de lieu, de date ou de formule, ou transformation en atelier si le lieu le permet. Plus vous me prévenez tôt, plus il reste de solutions sans frais." },
      { id: "ingredients", q: "Les ingrédients sont-ils fournis ?", a: "Pour les ateliers, les ingrédients prévus sont ceux de la pizza margherita. Si vous voulez d'autres garnitures, c'est à vous de les acheter, avec mes conseils. Pour la pizza party, je m'occupe de tout." },
      { id: "choix-pizzas", q: "Peut-on choisir les pizzas d'une pizza party ?", a: "Oui. On choisit ensemble dans la [carte](/carte), des classiques et des créations plus originales. Les quantités dépendent du nombre d'invités, et le choix des pizzas joue sur le prix. Pour un anniversaire ou une soirée à thème, je peux adapter les recettes." },
      { id: "menu-complet", q: "Faites-vous un menu complet avec entrée et dessert ?", a: "Je prépare principalement des pizzas. Je peux ajouter des focaccias avec des dips, préparées à l'avance, pour varier les plaisirs ou pour l'apéritif. Je ne fais pas de menu complet avec entrée et dessert." },
      { id: "camion", q: "Venez-vous avec un camion ?", a: "Non, je viens avec mon four électrique et mon matériel, sans camion. Le nombre de pizzas dépend de mon rythme, entre 12 et 18 pizzas par heure, selon les recettes." },
    ],
  },
  {
    id: "jour-j",
    title: "Le jour J, allergies et régimes",
    items: [
      { id: "deroule-atelier", q: "Comment se déroule un atelier pizza à domicile ?", a: "J'arrive chez vous avec le matériel. On travaille la pâte à la main, on boule les pâtons, puis chacun étale et garnit sa pizza. On cuit, et on mange ensemble à la fin, autour de ce qu'on vient de faire. Les Bases durent de 2h à 2h30, l'initiation de 2h30 à 3h." },
      { id: "deroule-party", q: "Comment se déroule une pizza party avec un pizzaiolo à domicile ?", a: "J'arrive avec mon four et je prépare les pizzas sur place. Vous restez avec vos invités, et les pizzas sortent du four au fil de la soirée. Je m'occupe des ingrédients et de la pâte. L'arrivée et l'installation dépendent du lieu, je vous les précise dans le devis." },
      { id: "cuisine", q: "Laissez-vous la cuisine propre ?", a: "Avant de partir, je range et je nettoie rapidement ce que j'ai utilisé. Je ne fais pas le ménage de la pièce." },
      { id: "allergies", q: "J'ai des allergies ou un régime particulier.", a: "Dites-le-moi dès la demande, j'en tiens compte dans le devis. Pour une allergie sévère, parlons-en avant de réserver." },
      { id: "vegetarien-gluten", q: "Faites-vous des pizzas végétariennes ou sans gluten ?", a: "Plusieurs pizzas de la [carte](/carte) sont sans viande, comme la Margherita, les 3 Fromages, les 4 Fromages ou la Chèvre-miel. Une pizza sans gluten est possible sur demande : elle demande plus de préparation, donc elle a un coût supplémentaire, et je la prépare et la cuis en premier, séparée des autres pizzas. Précisez-le dès la demande." },
    ],
  },
  {
    id: "reserver",
    title: "Réserver, payer et annuler",
    items: [
      { id: "delai", q: "Combien de temps à l'avance faut-il réserver ?", a: "Cela dépend de la demande et de ma disponibilité : le plus tôt est le mieux. Une demande urgente peut être acceptée jusqu'à une semaine avant la date, selon mes disponibilités. Écrivez-moi avec la date, le nombre de personnes et l'occasion." },
      { id: "reservation", q: "Comment réserver, et comment je paie ?", a: "Vous me contactez avec le [formulaire](/contact) ou par téléphone, et je vous réponds avec un devis. Un acompte de 30 % confirme la date, et je vous indique comment le régler. Le solde se règle le jour de la prestation, en espèces ou par virement. Wero et Revolut sont aussi acceptés sur place. Je n'accepte pas les chèques." },
      { id: "cadeau", q: "Peut-on offrir un atelier pizza ?", a: "Oui. Vous réservez un atelier, et je vous envoie un bon d'invitation à offrir. Le montant dépend de l'atelier choisi, ou se fixe sur demande. Le bon n'a pas de date limite : la date se choisit ensemble, avec la personne invitée. Le paiement se fait comme pour les autres prestations." },
      { id: "annulation", q: "Que se passe-t-il si je dois annuler ?", a: "Un imprévu peut arriver, et je cherche toujours une solution avec vous. Plus de 14 jours avant, c'est sans frais et l'acompte vous est rendu. Entre 14 et 7 jours, vous pouvez reporter une fois ; si vous annulez, l'acompte reste acquis. Entre 7 jours et 72 heures, 50 % du prix est dû. Moins de 72 heures avant, ou en cas d'absence, la totalité est due. J'achète les ingrédients et je prépare la pâte quelques jours avant, c'est pour ça que les dernières échéances sont plus strictes. Le nombre de participants peut être réduit sans frais jusqu'à 7 jours avant, dans la limite de 4 personnes pour un atelier. Le détail est dans les [conditions générales](/cgv)." },
      { id: "annulation-pierre", q: "Et si c'est vous qui devez annuler ?", a: "Je propose une autre date, ou je rembourse tout ce qui a été versé. C'est valable pour une maladie ou un imprévu de ma part." },
    ],
  },
];

const items = sections.flatMap((s) => s.items);

module.exports = {
  sections,
  items,
  pick: (ids) => ids.map((id) => items.find((i) => i.id === id)).filter(Boolean),
};
