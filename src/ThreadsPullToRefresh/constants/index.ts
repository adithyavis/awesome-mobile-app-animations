export const THREADS_BACKGROUND = '#101010';
export const THREADS_FOREGROUND = '#FFFFFF';
export const THREADS_GRAY = '#999999';

export const PULL_TO_REFRESH_THRESHOLD = 80;
export const MAX_PULL_DISTANCE = 120;

export const generateNewPost = () => {
  return {
    id: Date.now().toString(),
    username: 'new_user',
    avatar: 'https://i.pravatar.cc/150?img=70',
    content: 'just refreshed the feed! ✨\n\neverything is up to date now',
    timestamp: 'Just now',
  };
};

export const MOCK_POSTS = [
  {
    id: '1',
    username: 'sarahchen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content:
      'just shipped our biggest feature yet and immediately found a typo in the marketing email that went to 50k users\n\nthis is fine everything is fine 🙃',
    timestamp: '2m',
  },
  {
    id: '2',
    username: 'devmarcus',
    avatar: 'https://i.pravatar.cc/150?img=12',
    content:
      'why does "works on my machine" hit different when you\'re the one who has to deploy it',
    timestamp: '15m',
  },
  {
    id: '3',
    username: 'uxemily',
    avatar: 'https://i.pravatar.cc/150?img=5',
    content:
      'interviewing users today:\n\nme: "how would you accomplish this task?"\nuser: *does something completely unexpected*\nme: *throws out 3 weeks of design work*\n\nthis is why we test with real people',
    timestamp: '1h',
  },
  {
    id: '4',
    username: 'techlead_mike',
    avatar: 'https://i.pravatar.cc/150?img=13',
    content:
      'junior dev: "should I use a forEach or map here?"\n\nme, who spent 2 hours yesterday debugging a subtle closure issue: "let me tell you a story"',
    timestamp: '2h',
  },
  {
    id: '5',
    username: 'coffee_first',
    avatar: 'https://i.pravatar.cc/150?img=33',
    content:
      'git commit -m "fix"\ngit commit -m "actually fix"\ngit commit -m "ok now it works"\ngit commit -m "i swear this is the last one"',
    timestamp: '3h',
  },
  {
    id: '6',
    username: 'designjess',
    avatar: 'https://i.pravatar.cc/150?img=9',
    content:
      'client: "can you make the logo bigger?"\nme: "sure, but it might affect the balance of the—"\nclient: "BIGGER"\nme: *makes logo bigger*\nclient: "hmm can you make it smaller?"\n\nevery. single. time.',
    timestamp: '4h',
  },
  {
    id: '7',
    username: 'reactninja',
    avatar: 'https://i.pravatar.cc/150?img=14',
    content:
      "me: *writes 500 lines of complex state management*\nalso me: *realizes I could've just used a boolean*\n\noverengineering is my love language",
    timestamp: '5h',
  },
  {
    id: '8',
    username: 'startuplife_',
    avatar: 'https://i.pravatar.cc/150?img=16',
    content:
      'funding update: we raised $0\n\nrevenue update: we made $47 this month\n\nhappiness update: somehow at an all-time high\n\nbuilding in public is wild',
    timestamp: '6h',
  },
  {
    id: '9',
    username: 'pixel_sarah',
    avatar: 'https://i.pravatar.cc/150?img=20',
    content:
      "spending 4 hours perfecting a hover animation that 98% of users will never notice\n\nbut the 2% who do? they'll feel it. that's what matters.",
    timestamp: '7h',
  },
  {
    id: '10',
    username: 'backend_sam',
    avatar: 'https://i.pravatar.cc/150?img=31',
    content:
      'optimized our API response time from 2.3s to 180ms\n\nPM: "users won\'t notice"\n\nme: *cries in performance metrics*',
    timestamp: '8h',
  },
  {
    id: '11',
    username: 'solodev',
    avatar: 'https://i.pravatar.cc/150?img=52',
    content:
      'being a solo dev means:\n\n9am: CEO\n10am: designer\n11am: developer  \n2pm: QA tester\n5pm: customer support\n8pm: "why did I think this was a good idea"\n9pm: *keeps building anyway*',
    timestamp: '10h',
  },
  {
    id: '12',
    username: 'animationpro',
    avatar: 'https://i.pravatar.cc/150?img=60',
    content:
      'hot take: spring animations > ease-in-out\n\nfight me (but use proper physics-based motion when you do)',
    timestamp: '12h',
  },
  {
    id: '13',
    username: 'debugqueen',
    avatar: 'https://i.pravatar.cc/150?img=47',
    content:
      "fixed a bug that's been haunting me for 3 days\n\nthe solution? removed one line\n\nthat line? a console.log I added while debugging\n\nwe don't talk about how that broke everything",
    timestamp: '14h',
  },
  {
    id: '14',
    username: 'uxresearch',
    avatar: 'https://i.pravatar.cc/150?img=26',
    content:
      'reminder: your users don\'t think in features, they think in problems\n\n"I need a button" = "I\'m stuck and don\'t know what to do next"\n\nsolve the real problem.',
    timestamp: '16h',
  },
  {
    id: '15',
    username: 'fullstack_alex',
    avatar: 'https://i.pravatar.cc/150?img=68',
    content:
      "postgres gave me an error\n\nspent 2 hours debugging\n\nthe error message literally told me what was wrong\n\nI just didn't read it properly\n\nRTFM includes error messages apparently",
    timestamp: '18h',
  },
  {
    id: '16',
    username: 'mobilefirst',
    avatar: 'https://i.pravatar.cc/150?img=11',
    content:
      'testing the app:\n\niPhone 15 Pro: *perfect*\niPhone 12: *perfect*  \niPhone SE: *perfect*\niPhone 6s that one user somehow still has: *everything is on fire*',
    timestamp: '20h',
  },
  {
    id: '17',
    username: 'designsystem',
    avatar: 'https://i.pravatar.cc/150?img=24',
    content:
      'me: "we need a design system for consistency"\n\nteam: "great idea!"\n\n*6 months later*\n\nme: *maintaining 47 button variants*\n\nthis is not what I meant',
    timestamp: '22h',
  },
  {
    id: '18',
    username: 'buildpublic',
    avatar: 'https://i.pravatar.cc/150?img=17',
    content:
      "Day 47 of building in public:\n\nusers: 12 (+2 this week!)\nrevenue: $0\nlessons learned: countless\nregrets: zero\n\nwe're all gonna make it",
    timestamp: '1d',
  },
  {
    id: '19',
    username: 'codereviews',
    avatar: 'https://i.pravatar.cc/150?img=59',
    content:
      'reviewing code:\n\n"nit: can we rename this variable?"\n"nit: add a comment here?"\n"nit: this could be cleaner"\n\n*approves*\n\nreviewing my own code from 6 months ago:\n\n"what psychopath wrote this"',
    timestamp: '1d',
  },
  {
    id: '20',
    username: 'typescriptfan',
    avatar: 'https://i.pravatar.cc/150?img=32',
    content:
      'switching from JavaScript to TypeScript:\n\nweek 1: "why is everything an error"\nweek 2: "ok this is annoying but helpful"\nweek 3: "how did I ever live without this"\n\nnow I\'m that person who puts types on everything',
    timestamp: '1d',
  },
];
