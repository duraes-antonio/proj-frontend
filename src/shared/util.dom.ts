export const utilDOM = {
  setBodyBackgroundColor(colorCSS: string): void {
    const background = document.getElementById('body-content');

    if (background) {
      background.style.backgroundColor = colorCSS;
    }
  }
};
