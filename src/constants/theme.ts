export const COLORS = {
  primary: '#8A8E75',    // Sage: Active toggles, hero Ikigai circle, primary buttons
  background: '#F1EAD8', // Cream: Main screen backgrounds
  secondary: '#D5C7AD',  // Sand: Inactive toggles, card borders, tags
  text: '#68604D',       // Deep Brown: All text (headings + body)
  surface: '#FFFFFF',    // White: Cards, input fields, modals
  sand: '#D5C7AD',
  darkSage: '#6A7059',
  error: '#C77D63',      // Terracotta: Delete icons, destructive actions
  
  // Pillars (Using Primary for all active states per instructions, but keeping distinct subtle tints if needed later. 
  // For now, mapping all pillars to Primary/Text scheme to stay minimal as requested).
  // However, let's keep the concept of pillars but unify the color to Primary for consistency with "Sage -> Active toggles"
  pillarLove: '#8A8E75', 
  pillarSkill: '#8A8E75',
  pillarNeed: '#8A8E75',
  pillarPay: '#8A8E75',
};

export const FONTS = {
  heading: 'TenorSans_400Regular',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
};

export const SPACING = {
  s: 8,
  m: 16,
  l: 24, // Global horizontal padding
  xl: 32,
  gridGap: 16,
};

export const SHAPE = {
  radius: 20, // Card border radius
  pill: 999,  // Fully rounded buttons
};
