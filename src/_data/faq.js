// Questions fréquentes : source unique pour /faq, les blocs FAQ des pages d'offre
// et le balisage FAQPage. Textes repris de 02-contenu-pages.md.
// La question « Que dois-je prévoir chez moi ? » est exclue (réponse entre crochets, non publiable).
const items = [
  { id: "four", q: "Faut-il un four spécial ?", a: "Pour l'atelier Bases, un four domestique suffit, avec une pierre à pizza si vous en avez une (sinon, comptez environ 50 € pour la pierre et quelques accessoires). Pour l'initiation et la pizza party, j'apporte mon four." },
  { id: "debutant", q: "Je suis débutant, est-ce que ça va ?", a: "Oui. Aucun niveau n'est demandé, et personne n'est jugé sur sa pizza. Si elle n'est pas ronde, elle sera bonne quand même." },
  { id: "nombre", q: "Combien de personnes pour un atelier ?", a: "De 4 à 6 personnes. Je garde les groupes petits exprès : chacun a sa place autour du plan de travail, on discute et on rigole, et je peux m'occuper de tout le monde. Pour une pizza party, le nombre d'invités se discute au moment du devis." },
  { id: "duree", q: "Combien de temps dure un atelier ?", a: "Les Bases durent de 2h à 2h30. L'initiation dure de 2h30 à 3h." },
  { id: "zone", q: "Où venez-vous ?", a: "À Lyon et dans un rayon de 10 km. Dans cette zone, le déplacement est inclus. Au-delà, un complément peut s'appliquer, je le précise dans le devis." },
  { id: "stationnement", q: "Et si je dois payer le stationnement ?", a: "Je facture le stationnement au prix réel. Si vous pouvez m'indiquer une place gratuite près de chez vous, c'est mieux pour tout le monde." },
  { id: "allergies", q: "J'ai des allergies ou un régime particulier.", a: "Dites-le-moi dès la demande, j'en tiens compte dans le devis. Pour une allergie sévère, parlons-en avant de réserver." },
  { id: "diplome", q: "Y a-t-il un diplôme à la fin ?", a: "Non. Ce sont des ateliers pour le plaisir, pas une formation professionnelle." },
  { id: "mozzarella", q: "Quelle mozzarella utilisez-vous ?", a: "Uniquement du fior di latte. Sur la farine et la tomate, je ne fais aucun compromis." },
  { id: "reservation", q: "Comment réserver, et comment je paie ?", a: "Vous me contactez avec le formulaire ou par téléphone, et je vous réponds avec un devis. Un acompte de 30 % confirme la date, et je vous indique comment le régler. Le solde se règle le jour de la prestation." },
  { id: "annulation", q: "Que se passe-t-il si je dois annuler ?", a: "Plus de 14 jours avant, c'est sans frais et l'acompte vous est rendu. Entre 14 et 7 jours, vous pouvez reporter une fois ; si vous annulez, l'acompte reste acquis. Entre 7 jours et 72 heures, 50 % du prix est dû. Moins de 72 heures avant, ou en cas d'absence, la totalité est due. J'achète les ingrédients et je prépare la pâte quelques jours avant, c'est pour ça que les dernières échéances sont plus strictes. Le détail est dans les conditions générales." },
  { id: "ingredients", q: "Les ingrédients sont-ils fournis ?", a: "Pour les ateliers, les ingrédients prévus sont ceux de la pizza margherita. Si vous voulez d'autres garnitures, c'est à vous de les acheter, avec mes conseils. Pour la pizza party, je m'occupe de tout." },
];

module.exports = {
  items,
  pick: (ids) => ids.map((id) => items.find((i) => i.id === id)).filter(Boolean),
};
