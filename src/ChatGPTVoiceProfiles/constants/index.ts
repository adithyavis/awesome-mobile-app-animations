export const ORB_SIZE = 200;

export interface VoiceProfile {
  name: string;
  description: string;
}

// Single color palette — same blue for all voices
export const ORB_COLORS = {
  colorA: [0.0, 0.35, 0.9] as [number, number, number], // deep saturated blue
  colorB: [0.95, 0.97, 1.0] as [number, number, number], // near-white
  colorC: [0.1, 0.65, 1.0] as [number, number, number], // vivid cyan-blue
};

export const VOICE_PROFILES: VoiceProfile[] = [
  { name: 'Breeze', description: 'Animated and earnest' },
  { name: 'Juniper', description: 'Open and upbeat' },
  { name: 'Ember', description: 'Confident and optimistic' },
  { name: 'Arbor', description: 'Easygoing and versatile' },
  { name: 'Spruce', description: 'Calm and affirming' },
  { name: 'Cove', description: 'Composed and direct' },
  { name: 'Vale', description: 'Bright and curious' },
  { name: 'Sol', description: 'Savvy and relaxed' },
  { name: 'Maple', description: 'Cheerful and candid' },
];
