let sizes = {};
for (let index = 1; index <= 100; index++) {
  sizes[index * 4 + 'px'] = index * 4 + 'px';
}

let minSize = {
  0: '0',
  '1/4': '25%',
  '1/2': '50%',
  '3/4': '75%',
  full: '100%',
};

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'main-1': 'var(--mainColor1)',
        'main-2': 'var(--mainColor2)',
        'main-3': 'var(--mainColor3)',
        'main-4': 'var(--mainColor4)',
        'font-1': 'var(--fontColor1)',
        'font-2': 'var(--fontColor2)',
        'font-3': 'var(--fontColor3)',
      },
      borderColor: {
        'color-1': 'var(--bgColor1)',
        'color-2': 'var(--bgColor3)',
        'color-3': 'var(--bgColor3)',
      },
      text: {
        huge: 'var(--hugeFontSize)',
      },
      backgroundColor: {
        'main-1': 'rgba(45, 153, 225, var(--tw-bg-opacity))',
      },
      boxShadow: {
        btn: '0 4px 8px 0 rgba(45, 153, 255, .24)',
      },
      height: sizes,
      width: sizes,
      minWidth: minSize,
      minHeight: minSize,
    },
  },
  variants: {},
  plugins: [],
};
