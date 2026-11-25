/**
 * Textes du fond animé de l'accueil.
 * Format : une citation par ligne, habillée d'une balise HTML.
 * Pour en ajouter, il suffit d'ajouter une ligne au bon endroit.
 */

/* --- Textes d'origine ---------------------------------------------------- */
const original = [
  `<section class="scripture">In the beginning God created the heaven and the earth.</section>`,
  `<p class="light">And God said, Let there be light: and there was light.</p>`,
  `<span class="truth">The light shineth in darkness; and the darkness comprehended it not.</span>`,
  `<div class="faith">For now we see through a glass, darkly; but then face to face.</div>`,
  `<article class="strength">Be strong and of a good courage, be not afraid.</article>`,
  `<code class="heart">For where your treasure is, there will your heart be also.</code>`,
  `<p class="seek">Ask, and it shall be given you; seek, and ye shall find.</p>`,
  `<section class="above">Set your affection on things above, not on things on the earth.</section>`,
  `<p class="invictus">Out of the night that covers me,Black as the pit from pole to pole,</p>`,
  `<article class="victory">It matters not how strait the gate,</article>`,
  `<p class="invictus">How charged with punishments the scroll,I am the master of my fate :</p>`,
  `<div class="victory">I am the captain of my soul.</div>`,
  `<div class="Laboetie">What makes a friend trustworthy is knowing their integrity.</div>`,
  `<div class="Friendly">This is guaranteed by their good nature, loyalty, and consistency.</div>`,
  `<p class="liberty">But this tyrant alone, there is no need to fight him or overthrow him.</p>`,
  `<p class="free">He is defeated of his own accord provided that the country does not consent to his servitude.</p>`,
  `<div class="heart">I am the alpha and the omega.</div>`,
];

/* --- Bible (King James) ---------------------------------------------------- */
const bible = [
  `<p class="truth">And ye shall know the truth, and the truth shall make you free.</p>`,
  `<section class="season">To every thing there is a season, and a time to every purpose under the heaven.</section>`,
  `<span class="vanity">Vanity of vanities; all is vanity.</span>`,
  `<p class="shepherd">The Lord is my shepherd; I shall not want.</p>`,
  `<code class="lamp">Thy word is a lamp unto my feet, and a light unto my path.</code>`,
  `<div class="spirit">Where the Spirit of the Lord is, there is liberty.</div>`,
  `<p class="pure">Blessed are the pure in heart: for they shall see God.</p>`,
  `<article class="charity">Charity suffereth long, and is kind.</article>`,
];

/* --- Poésie ---------------------------------------------------------------- */
const poetry = [
  `<p class="tempest">We are such stuff as dreams are made on, and our little life is rounded with a sleep.</p>`,
  `<span class="blake">To see a World in a Grain of Sand, and a Heaven in a Wild Flower.</span>`,
  `<div class="ulysses">To strive, to seek, to find, and not to yield.</div>`,
  `<p class="if">If you can keep your head when all about you are losing theirs.</p>`,
  `<article class="road">Two roads diverged in a wood, and I took the one less traveled by.</article>`,
  `<code class="hamlet">To be, or not to be: that is the question.</code>`,
];

/* --- Philosophie ----------------------------------------------------------- */
const philosophy = [
  // Étienne de La Boétie — Discours de la servitude volontaire
  `<div class="Laboetie">Resolve to serve no more, and you are at once freed.</div>`,
  `<p class="Laboetie">It is the people who enslave themselves, who cut their own throats.</p>`,
  // Alexis de Tocqueville — De la démocratie en Amérique
  `<section class="tocqueville">Liberty cannot be established without morality, nor morality without faith.</section>`,
  `<p class="tocqueville">In democracies each new generation is a new people.</p>`,
  `<div class="tocqueville">The past no longer throws its light upon the future, the mind of man wanders in obscurity.</div>`,
  // Montesquieu
  `<p class="montesquieu">There is no crueler tyranny than that exercised in the shadow of the laws.</p>`,
  // Pascal, Descartes, Montaigne, Rousseau, Voltaire
  `<span class="pascal">The heart has its reasons which reason knows nothing of.</span>`,
  `<p class="pascal">Man is but a reed, the most feeble thing in nature; but he is a thinking reed.</p>`,
  `<code class="descartes">I think, therefore I am.</code>`,
  `<span class="montaigne">What do I know?</span>`,
  `<p class="rousseau">Man is born free, and everywhere he is in chains.</p>`,
  `<div class="voltaire">We must cultivate our garden.</div>`,
  // Antiquité
  `<p class="socrates">The unexamined life is not worth living.</p>`,
  `<span class="heraclitus">No man ever steps in the same river twice.</span>`,
  `<article class="epictetus">No man is free who is not master of himself.</article>`,
  `<p class="seneca">While we are postponing, life speeds by.</p>`,
  `<div class="aurelius">The happiness of your life depends upon the quality of your thoughts.</div>`,
  // Kant
  `<code class="kant">Sapere aude! Have courage to use your own understanding.</code>`,
];

export const verses: string[] = [...original, ...bible, ...poetry, ...philosophy];
