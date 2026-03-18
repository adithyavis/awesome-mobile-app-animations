export const THREADS_BACKGROUND = '#101010';
export const THREADS_FOREGROUND = '#FFFFFF';
export const THREADS_GRAY = '#999999';
export const SPOILER_MASK_BG = '#2D2D2D';

export const PARTICLE_COUNT = 70;
export const PARTICLE_MIN_RADIUS = 1.0;
export const PARTICLE_MAX_RADIUS = 3.5;
export const MASK_CORNER_RADIUS = 6;

export interface PostData {
  id: string;
  username: string;
  avatar: string;
  content: string;
  spoilerContent?: string;
  timestamp: string;
}

export const MOCK_SPOILER_POSTS: PostData[] = [
  {
    id: '1',
    username: 'moviefanatic',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content:
      'just watched that new thriller everyone is talking about\n\nno way i saw that ending coming',
    spoilerContent: 'the detective was the killer all along',
    timestamp: '5m',
  },
  {
    id: '2',
    username: 'devmarcus',
    avatar: 'https://i.pravatar.cc/150?img=12',
    content:
      "why does \"works on my machine\" hit different when you're the one who has to deploy it",
    timestamp: '15m',
  },
  {
    id: '3',
    username: 'seriesbinger',
    avatar: 'https://i.pravatar.cc/150?img=5',
    content: 'finished season 4 in one sitting\n\nmy jaw is still on the floor',
    spoilerContent:
      'they killed off the main character in the finale and the villain won',
    timestamp: '32m',
  },
  {
    id: '4',
    username: 'animefan99',
    avatar: 'https://i.pravatar.cc/150?img=8',
    content:
      'this new anime season is going to break the internet\n\nthe manga readers have been waiting years for this',
    spoilerContent: 'the hero loses his powers permanently in the next arc',
    timestamp: '1h',
  },
  {
    id: '5',
    username: 'techsarah',
    avatar: 'https://i.pravatar.cc/150?img=9',
    content:
      'hot take: most design systems are over-engineered for what teams actually need',
    timestamp: '1h',
  },
  {
    id: '6',
    username: 'bookworm_eli',
    avatar: 'https://i.pravatar.cc/150?img=15',
    content: 'just finished that book everyone recommended\n\ni need to talk about the ending',
    spoilerContent: 'the narrator was unreliable the whole time and the friend never existed',
    timestamp: '2h',
  },
  {
    id: '7',
    username: 'gamer_jules',
    avatar: 'https://i.pravatar.cc/150?img=22',
    content:
      'finally beat the final boss after 47 attempts\n\nthis game does NOT hold your hand',
    timestamp: '2h',
  },
  {
    id: '8',
    username: 'filmcritic_maya',
    avatar: 'https://i.pravatar.cc/150?img=25',
    content: 'the post-credits scene changes everything about the franchise',
    spoilerContent: 'the villain from the first movie is actually alive and is the new hero\'s father',
    timestamp: '3h',
  },
  {
    id: '9',
    username: 'codingmax',
    avatar: 'https://i.pravatar.cc/150?img=30',
    content:
      'spent 4 hours debugging only to realize i was editing the wrong file the entire time\n\ngoing to bed',
    timestamp: '4h',
  },
  {
    id: '10',
    username: 'tvaddict_sam',
    avatar: 'https://i.pravatar.cc/150?img=33',
    content: 'THAT episode was everything\n\ni screamed',
    spoilerContent: 'they brought back the character who died in season 2 as a clone',
    timestamp: '5h',
  },
];
