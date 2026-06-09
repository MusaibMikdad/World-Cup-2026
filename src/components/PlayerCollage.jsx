import './PlayerCollage.css';

export const defaultLegends = [
  {
    name: 'Lionel Messi',
    country: 'Argentina',
    number: 10,
    image: '/messi.jpg',
    accent: '#75AADB', // Argentina blue
    bioUrl: 'https://share.google/jfrmkd4OadQTGBWoE',
  },
  {
    name: 'Neymar Jr',
    country: 'Brazil',
    number: 10,
    image: '/neymar_close.png?v=1',
    accent: '#FFDF00', // Brazil yellow
    bioUrl: 'https://share.google/FUD4Ui6FiXKv5VbAM',
  },
  {
    name: 'Cristiano Ronaldo',
    country: 'Portugal',
    number: 7,
    image: '/ronaldo.jpg',
    accent: '#FF2D2D', // Portugal red
    bioUrl: 'https://share.google/ooggm7SgPZYhvO8hg',
  },
  {
    name: 'Kylian Mbappe',
    country: 'France',
    number: 10,
    image: '/mbappe.jpg?v=3',
    accent: '#002654', // France blue
    bioUrl: 'https://share.google/odlLnQyfXYBO6iqn0',
  },
  {
    name: 'Lamine Yamal',
    country: 'Spain',
    number: 19,
    image: '/yamal.png',
    accent: '#AA151B', // Spain red
    bioUrl: 'https://share.google/x1t6ZZODTCaXDTNC9',
  },
  {
    name: 'Harry Kane',
    country: 'England',
    number: 9,
    image: '/kane.jpg',
    accent: '#FFFFFF', // England white
    bioUrl: 'https://share.google/xbdjgyrGZZeSLMFOj',
  }
];

export default function PlayerCollage({ 
  title1 = "Stars", 
  title2 = "on the Pitch", 
  subtitle = "The world's finest, one stage", 
  players = defaultLegends 
}) {
  return (
    <section className="player-collage">
      <div className="player-collage__bg-glow player-collage__bg-glow--1" />
      <div className="player-collage__bg-glow player-collage__bg-glow--2" />
      <div className="player-collage__bg-glow player-collage__bg-glow--3" />

      <h2 className="player-collage__heading">
        <span className="gradient-text">{title1}</span> {title2}
      </h2>
      <p className="player-collage__subtext">{subtitle}</p>

      <div className="player-collage__grid">
        {players.map((player, i) => (
          <a
            href={player.bioUrl}
            target="_blank"
            rel="noopener noreferrer"
            key={player.name}
            className={`player-collage__card player-collage__card--${i}`}
            style={{ '--player-accent': player.accent, display: 'block', textDecoration: 'none' }}
          >
            {/* Glow ring behind image */}
            <div className="player-collage__glow" />

            {/* Image */}
            <div className="player-collage__image-wrapper">
              <img
                src={player.image}
                alt={player.name}
                className="player-collage__image"
                loading="lazy"
                draggable={false}
              />
              <div className="player-collage__image-overlay" />
            </div>

            {/* Info */}
            <div className="player-collage__info">
              <span className="player-collage__number">#{player.number}</span>
              <h3 className="player-collage__name">{player.name}</h3>
              <span className="player-collage__country">{player.country}</span>
            </div>

            {/* Decorative border */}
            <div className="player-collage__border-anim" />
          </a>
        ))}
      </div>
    </section>
  );
}
