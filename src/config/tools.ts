export interface Tool {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const tools: Tool[] = [
  {
    title: 'Temperature Converter',
    description: 'Convert temperatures between Celsius and Fahrenheit with real-time updates.',
    icon: '🌡️',
    link: '/temperature-converter',
  },
  {
    title: 'Hex to RGB Converter',
    description: 'Convert colors between Hexadecimal and RGB formats with live preview.',
    icon: '🎨',
    link: '/hex-rgb-converter',
  },
  {
    title: 'Volume Converter',
    description: 'Convert volumes between metric and imperial units for cooking and more.',
    icon: '🥛',
    link: '/volume-converter',
  },
  {
    title: 'Length Converter',
    description: 'Convert lengths between metric and imperial measurement systems.',
    icon: '📏',
    link: '/measurement-converter',
  },
  {
    title: 'Time Converter',
    description: 'Convert time between seconds, minutes, hours, days, months, and years.',
    icon: '⏱️',
    link: '/time-converter',
  },
  {
    title: 'Password Generator',
    description: 'Generate secure passwords with customizable options and strength indicator.',
    icon: '🔐',
    link: '/password-generator',
  },
  {
    title: 'Badminton Manager',
    description: 'Manage your badminton games, players, and tournaments.',
    icon: '🏸',
    link: '/badminton-manager',
  },
  {
    title: 'Phone Keypad Converter',
    description: 'Convert text to phone keypad sequences and back, like the classic T9 keyboard.',
    icon: '📱',
    link: '/phone-text-converter',
  },
];

